
import express from "express"
import { registerController } from "../controllers/authController";

//router object
const router = express.Router()

//routes

router.post('/register',registerController)

export default router;