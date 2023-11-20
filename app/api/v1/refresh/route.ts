
import { getSession } from 'next-auth/react';
import jwt, { Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get the refresh token from the request body
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required in the request body.' });
    }

    try {
      // Decode the refresh token to get user information or any other necessary data
      const secret_key = process.env.SECRET_KEY as Secret;
      const decoded = jwt.verify(refreshToken, secret_key);

      // Use the decoded data to generate a new access token
      const newAccessToken = jwt.sign({decoded}, secret_key, {
        expiresIn: '1h', // Set the expiration time as needed
      });

      // Respond with the new access token
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error decoding or verifying the refresh token:', error);
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed status
    return res.status(405).end();
  }
}
