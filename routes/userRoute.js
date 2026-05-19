import express from 'express'
import { Reigster } from '../controllers/User.js'

const router = express.Router()

router.route("/register").post(Reigster)

export default router;