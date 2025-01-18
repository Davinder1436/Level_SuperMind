// src/routes/auth.routes.ts
import { Router, RequestHandler } from 'express';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';
import { UserModel } from '../models/user.model';
import { UserInput } from '../types/user.types';

const router = Router();

interface SignupBody extends UserInput {}

interface SigninBody {
  email: string;
  password: string;
}

const signupHandler: RequestHandler<{}, any, SignupBody> = async (req, res) => {
  try {
    const { email, password, ...userData } = req.body;

    // Validate input
    if (!email || !password || !userData.name || !userData.dob || 
        !userData.time || !userData.gender || !userData.state || !userData.city) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check if user exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await UserModel.createUser({
      ...userData,
      email,
      hashedPassword,
    });

    const token = generateToken(email);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signinHandler: RequestHandler<{}, any, SigninBody> = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(email);

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.post('/signup', signupHandler);
router.post('/signin', signinHandler);

export default router;