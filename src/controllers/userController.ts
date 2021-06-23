import { User } from '../models/userModel';
import { Request, Response } from 'express';

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        userId: user._id
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

export { signUp };
