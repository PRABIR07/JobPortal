
import express from "express"
import { loginController, registerController } from "../controllers/authController";

//router object
const router = express.Router()

//routes

//register || POST
router.post('/register',registerController)

//login || POST
router.post('/login', loginController)

export default router;