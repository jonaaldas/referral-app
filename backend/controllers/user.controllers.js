import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userSchema from '../models/user.js'


// @desc Create User
// @route Post/api/user
// @access Public
export const registerUser = async (req, res) => {
  const {name, email, password} = req.body 

  if(!name || !email || !password) {
  res.status(400) 
  throw new Error('Please add new user')
  }

  const userExist = await userSchema.findOne({email})

  if(userExist){
    res.status(400)
    throw new Error('User already exist')
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
  } else {
    throw new Error('invalid user data')
  }

}

// @desc Authenticate a user
// @route Post/api/user/login
// @access Public
export const logInUser = async (req, res) => {
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
    throw new Error('invalid user credentials')
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