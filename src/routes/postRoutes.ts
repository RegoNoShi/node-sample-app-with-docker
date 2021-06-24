import express from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getOnePost
} from '../controllers/postController';
import { ensureSession } from '../midlleware/authMiddleware';

export const router = express.Router();
router.use(ensureSession);
router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getOnePost).patch(updatePost).delete(deletePost);
