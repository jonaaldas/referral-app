import express from 'express'
import dotenv, {config} from 'dotenv'
import referralRouter from './routes/referrals.routes.js'
import userlRouter from './routes/user.routes.js'
import {errorHandler} from './middleware/errorMiddlewear.js'
import {mongodb} from './config/db.js'

import cors from 'cors'
const port = process.env.PORT || 5012



const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

// database
mongodb()
// routes
app.use('/api', referralRouter)
app.use('/api/user', userlRouter)
app.use(errorHandler)

app.listen(port);
console.log(`server is running in port ${port}`);