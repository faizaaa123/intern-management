
import { getSession } from 'next-auth/react';
import jwt, { Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
 
        if (req.method === 'POST') {
            // Get the refresh token from the request body
            const body = await req.json();
            const { refreshToken } = body
            // console.log("I'm running ", refreshToken);
            
            if (!refreshToken) {
                return new NextResponse("Refresh Token is required in the body", {status: 400})
            }
            
            try {
                // Decode the refresh token to get user information 
                const secret_key = process.env.SECRET_KEY as Secret;
                console.log("from refresh",secret_key)
                const decoded = jwt.verify(refreshToken, secret_key);
                
      // Use the decoded data to generate a new access token
      const newAccessToken = jwt.sign({decoded}, secret_key, {
        expiresIn: '1h', // Set the expiration time as needed
      });

      // Respond with the new access token
      return NextResponse.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error decoding or verifying the refresh token:', error);
      return new NextResponse("Invalid Refresh Token", {status: 401})
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed status
    return new NextResponse("Method not allowed", {status: 405});
  }
}
