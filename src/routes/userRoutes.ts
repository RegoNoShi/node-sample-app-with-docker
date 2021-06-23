import express from 'express';
import { signUp } from '../controllers/userController';

export const router = express.Router();
router.route('/').post(signUp);
