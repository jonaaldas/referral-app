import express from 'express'
import {getUserData, logInUser, registerUser} from '../controllers/user.controllers.js'
import {protect} from '../middleware/authMiddleweat.js'
const router = express.Router()


router.post('/register', registerUser)
router.post('/login', logInUser)
router.get('/me',protect, getUserData)

export default router