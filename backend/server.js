import express from 'express'
import dotenv, {config} from 'dotenv'
import referralRouter from './routes/referrals.routes.js'
import {errorHandler} from './middleware/errorMiddlewear.js'
const port = process.env.PORT || 5002

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api', referralRouter)
app.use(errorHandler)

app.listen(port);
console.log(`server is running in port ${port}`);