import express from 'express'
import { getReferrals, createReferrals,updateReferral, deleteReferral } from "../controllers/referrals.controllers.js"
const router = express.Router()

router.get("/getreferrals", getReferrals)

router.post("/createreferral", createReferrals)

router.put("/updatereferral/:id", updateReferral)

router.delete("/deletereferral/:id", deleteReferral)

export default router