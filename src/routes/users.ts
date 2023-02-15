import express from 'express';
import { registerUser, verifyOtp } from '../controllers/userController';
const router = express.Router();

 router.post('/signup', registerUser);
 router.post('/verify', verifyOtp);

export default router;
