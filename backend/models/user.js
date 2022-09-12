import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name:{
    type: String,
    requiered: [true, 'Please add a name']
  },
  email:{
    type: String,
    requiered: [true, 'Please add a email'],
    unique: true
  },
  password:{
    type: String,
    requiered: [true, 'Please add a password']
  }
}, 
{
  timestanmp: true
})

export default mongoose.model('userSchema', userSchema)