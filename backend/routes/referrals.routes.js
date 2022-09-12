import express from 'express'
import { getReferrals, createReferrals,updateReferral, deleteReferral, updateNote, createNote, deleteNote } from "../controllers/referrals.controllers.js"
import {protect} from '../middleware/authMiddleweat.js'
const router = express.Router()

router.get("/getreferrals",protect, getReferrals)

router.post("/createreferral",protect, createReferrals)

router.put("/updatereferral/:id",protect, updateReferral)

router.delete("/deletereferral/:id",protect, deleteReferral)

// NOTE CRUD 
router.post("/createnote/:id",protect, createNote)

router.put("/updatenote/:note_id",protect, updateNote)

router.delete("/deletenote/:referral_id/note/:note_id", deleteNote)


export default router