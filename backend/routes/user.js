import express from "express";
import passport from 'passport'

const router = express.Router();

import { signin, register, getUser, logOut, getAllUsers } from "../controllers/user.js";

router.post("/signin",passport.authenticate('local'), signin);
router.post("/register",register);
router.get("/user",getUser)
router.post("/logout",logOut)
router.get('/getallusers',getAllUsers)

export default router;