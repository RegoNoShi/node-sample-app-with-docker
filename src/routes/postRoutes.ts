import express from 'express';
import { createPost, updatePost, deletePost, getAllPosts, getOnePost } from '../controllers/postController';

export const router = express.Router();
router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getOnePost).patch(updatePost).delete(deletePost);
