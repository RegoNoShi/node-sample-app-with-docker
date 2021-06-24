import bcrypt from 'bcryptjs';
import { User } from '../models/userModel';
import { Request, Response } from 'express';

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 12)
    });
    req.session.user = { name: username, id: user._id };
    res.status(201).json({
      status: 'success'
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = { name: username, id: user._id };
      res.status(200).json({
        status: 'success'
      });
    } else {
      res.status(401).json({
        status: 'failed',
        errorMessage: 'Invalid username and/or password'
      });
    }
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      errorMessage: e
    });
  }
};

export { signUp, signIn };
