import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userSchema from '../models/user.js'


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
    if(user && (bcrypt.compare(password, user.password))){
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

