import { Request, Response } from 'express';
import { Post } from '../models/postModel';

const getAllPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (e) {
    res.status(500).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

const getOnePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (e) {
    res.status(500).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(202).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

export { getAllPosts, getOnePost, createPost, updatePost, deletePost };
