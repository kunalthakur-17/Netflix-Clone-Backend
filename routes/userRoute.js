import express from 'express'
import { Login, Logout, Reigster } from '../controllers/User.js'

const router = express.Router()

router.route("/register").post(Reigster)
router.route("/login").post(Login)
router.route("/logout").get(Logout)

export default router;