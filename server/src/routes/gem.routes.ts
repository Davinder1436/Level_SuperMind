// src/routes/gem.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import axios from 'axios';

const router = Router();

interface GemSuggestionRequest {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

// Custom interface for the authenticated request
interface AuthRequest extends Request {
  body: {
    userId: string;
  }
}

const getGemSuggestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userEmail = req.body.userId; // Set by auth middleware
    
    // Fetch user data
    const user = await UserModel.findByEmail(userEmail);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Parse date and time
    const [year, month, day] = user.dob.split('-').map(Number);
    const [hour, min] = user.time.split(':').map(Number);

    // Prepare data for astrology API
    const requestData: GemSuggestionRequest = {
      day,
      month,
      year,
      hour,
      min,
      lat: Number(user.latitude) || 0,
      lon: Number(user.longitude) || 0,
      tzone: Number(user.timezone) || 5.5,
    };

    // Astrology API credentials
    const userId = process.env.ASTROLOGY_API_USER_ID;
    const apiKey = process.env.ASTROLOGY_API_KEY;
    const language = process.env.ASTROLOGY_API_LANGUAGE || 'en';
console.log('userId:', userId);
    if (!userId || !apiKey) {
      res.status(500).json({ message: 'API credentials not configured' });
      return;
    }

    // Create authorization header
    const auth = Buffer.from(`${userId}:${apiKey}`).toString('base64');

    // Make request to astrology API
    const response = await axios({
      method: 'POST',
      url: 'https://json.astrologyapi.com/v1/basic_gem_suggestion',
      headers: {
        'authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept-Language': language
      },
      data: requestData
    });

    // Return the API response
    res.json(response.data);
  } catch (error) {
    console.error('Gem suggestion error:', error);
    res.status(500).json({ message: 'Failed to get gem suggestion' });
  }
};

// Updated middleware with proper typing
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    // Your token verification logic here
    // Assuming it sets req.body.userId
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/gem_suggestion', authMiddleware, getGemSuggestion);

export default router;
