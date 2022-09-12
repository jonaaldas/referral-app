import express from 'express'
import { getReferrals, createReferrals,updateReferral, deleteReferral, updateNote, createNote, deleteNote } from "../controllers/referrals.controllers.js"
const router = express.Router()

router.get("/getreferrals", getReferrals)

router.post("/createreferral", createReferrals)

router.put("/updatereferral/:id", updateReferral)

router.delete("/deletereferral/:id", deleteReferral)

// NOTE CRUD 
router.post("/createnote/:id", createNote)

router.put("/updatenote/:note_id", updateNote)

router.delete("/deletenote/:referral_id/note/:note_id", deleteNote)


export default router