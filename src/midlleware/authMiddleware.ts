import { NextFunction, Request, Response } from 'express';

const ensureSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req.session;

  if (!user) {
    res.status(401).json({ status: 'failed', errorMessagge: 'unauthorized' });
  } else {
    next();
  }
};

export { ensureSession };
