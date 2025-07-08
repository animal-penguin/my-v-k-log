// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = Redis.fromEnv();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // TypeScript に「これは string です」と教える
  const stored = await redis.get(`user:${username}`) as string | null;

  if (!stored) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // ここで stored は string 型なので、bcrypt.compare が使える
  const isValid = await bcrypt.compare(password, stored);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.status(200).json({ message: 'Login successful' });
}
