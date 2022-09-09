import bcrypt from "bcryptjs";
import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  res.send('Successfully Authenticated')
};

export const register = async (req, res) => {
  const { name, username, password } = req.body; 

  if(!username || !password || typeof username !== "string" || typeof password !== "string"){
    res.send('Improper value')
    return
  }

  UserModal.findOne({username}, async (err, doc) => {
    if(err) throw err
    if(doc) res.send('User Already exists')
    if(!doc){
      const hashedPassword = await bcrypt.hash(password, 10)
      const User = new UserModal({
        name,
        username,
        password: hashedPassword
      })
      await User.save()
      res.send('Successfully registered')
    }
  })
};

export const getUser = async(req, res) => {
  res.send(req.user)
}

export const logOut = async(req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('You have been logged out')
  });
}