import express from 'express'
import dotenv, {config} from 'dotenv'
import referralRouter from './routes/referrals.routes.js'
import {errorHandler} from './middleware/errorMiddlewear.js'
import {mongodb} from './config/db.js'
const port = process.env.PORT || 5004


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))
// database
mongodb()
// routes
app.use('/api', referralRouter)
app.use(errorHandler)

app.listen(port);
console.log(`server is running in port ${port}`);