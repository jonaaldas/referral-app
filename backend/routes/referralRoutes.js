import express from 'express'

const router = express.Router()

import { createReferral } from "../controllers/referrals.js"

router.post("/createReferral", createReferral)

export default router