import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  mongodb
} from './routes/db.js';
import dotenv from 'dotenv';
import router from './routes/user.js'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportLocal from "passport-local"
import session from 'express-session'
import UserModal from "./models/user.js";
import bcrypt from "bcryptjs";

const LocalStrategy = passportLocal.Strategy

// middlewear
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
mongodb();
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}))
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

// passport code starts
passport.use(new LocalStrategy((username, password,done) => {
  UserModal.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  UserModal.findOne({ _id: id }, (err, user) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id
    };
    cb(err, userInformation);
  });
});
// passport code ends

// user routers
app.use('/auth',router);


const port = process.env.PORT || 6002;
app.listen(port);
console.log(`server is running in port ${port}`);
