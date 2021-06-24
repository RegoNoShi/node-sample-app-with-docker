import express from 'express';
import { signUp, signIn } from '../controllers/authController';

export const router = express.Router();
router.route('/signUp').post(signUp);
router.route('/signIn').post(signIn);
