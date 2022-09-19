import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userSchema from '../models/user.js'
import nodemailer from 'nodemailer'

// @desc Create User
// @route Post/api/user/register
// @access Public
export const registerUser = async (req, res) => {
 try {
  const {name, email, password} = req.body 

  if(!name || !email || !password) {
  res.status(400) 
  .json({ message: 'Please add new user'});
  return;
  }

  const userExist = await userSchema.findOne({email})
  if(userExist){
    res.status(400)
    .json({ message: 'User Already Exists'});
      return;
  }
  

  // hashPassword
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = new userSchema({
    name,
    email, 
    password: hashedPassword
  })

  await user.save()

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }
 } catch (error) {
  console.log(error)
 }
}

// @desc Authenticate a user
// @route Post/api/user/login
// @access Public
export const logInUser = async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await userSchema.findOne({email})
    console.log(user.password, password)
     if(user && (await bcrypt.compare(password, user.password))){
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: 'Invalid User Credentials'});
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
// generte jwt
const generateToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '30d',
  })
}
// @desc get Users
// @route Get/api/user/me
// @access Private
export const getUserData = async (req, res) => {
  const {name, email, _id} = await userSchema.findById(req.user.id)
  res.json({
    id: _id,
    name,
    email
  })
}

// forgot passowrd 
export const forgotPassword = (req, res) => {
  const email = req.body.email
  userSchema.find({email}, (err, user) => {
    if(err || !user){
      return res.status(400).json({erro: 'User with this email already exists'})
    }

    const token = jwt.sign({_id: user.id}, `${process.env.RESET_PASSWORD_KEY}`, {expiresIn: '15m'})

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth:{
        user: `${process.env.GOOGLE_APP_EMAIL}`,
        pass: `${process.env.GOOGLE_APP_PW}`
      }
    })

    const data = {
      from: 'noreply@referrals.io',
      to: email,
      subject: 'Reset Account Password Link',
      html: `
        <h3>Please click the link below to reset password</h3>
        <p>${process.env.CLIENT_URL}/update-password/${token}<p/>
      `
    }

    return userSchema.updateOne({resetLink: token}, (err, user) => {
      if(err){
        return res.status(400).json({error: 'reset password link error'})
      } else {
        transporter.sendMail(data, function(error, body){
          if(error){
            return res.status(400).json({error: error.message})
          }
          return res.status(200).json({message: 'Email has been sent, please follow the instructions'})
        })
      }
    })
  })
}


// updatePassword 

export const updatePassowrd = async (req, res) => {
  const {token, password} = req.body
  if(token){
    jwt.verify(token, `${process.env.RESET_PASSWORD_KEY}`, function (error, decodeData){
      if(error){
        return res.status(400).json({error: 'incorect token or it is expired'})
      }
      userSchema.findOne({resetLink: token}, (err, user)=>{
        if(err||!user){
          return res.status(400).json({error: 'User with this token does not exist'})
        }
        user.password = password
        user.save((err, result) => {
          if(err){
            return res.status(400).json({error: 'Reset Password Error'})
          } else {
            return res.status(200).json({message: 'Your password has benn changed'})
          }
        })
      })
    })
  } else {
    return res.status(401).json({error: 'Auth Error'})
  }
}