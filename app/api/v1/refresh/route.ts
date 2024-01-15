
import { getSession } from 'next-auth/react';
import jwt, { Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
 
        if (req.method === 'POST') {
            // Get the refresh token from the request body
            const body = await req.json();
            const { refreshToken } = body
                        
            if (!refreshToken) {
                return new NextResponse("Refresh Token is required in the body", {status: 400})
            }
            
            try {
                // Decode the refresh token to get user information 
                const secret_key = process.env.SECRET_KEY as Secret;
                const decoded = jwt.verify(refreshToken, secret_key);
                const payload = decoded as any
                const user = payload['user']
                
              // Use the decoded data to generate a new access token
              const newAccessToken = jwt.sign({user}, secret_key, {
                expiresIn: '15m', 
              });

              // DEBUGGING: console.log("this is the new accessToken ", newAccessToken)

              // Respond with the new access token
              return NextResponse.json({ accessToken: newAccessToken });

            } catch (error: any) {
              console.error('Error decoding or verifying the refresh token:', error);
              if (error['name'] === "TokenExpiredError")
              return new NextResponse("Refresh Token has expired", {status: 401})
            }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed status
    return new NextResponse("Method not allowed", {status: 405});
  }
}
