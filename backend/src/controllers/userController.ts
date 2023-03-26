import { Request, Response, Router } from 'express';
import { UserRepository } from '../repository/userRepository';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../services/authService';

const userRepository = new UserRepository();

export const userRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({ username, email, password: hashedPassword });

    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get('/me', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return res.status(401).json({ message: 'Invalid token' });
  }
    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  userRouter.post('/me', async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const userId = verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const user = await userRepository.update(userId, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json(user);
  });
  
  userRouter.post('/me/delete', async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const userId = verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const user = await userRepository.delete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json({ message: 'User deleted' });
  });