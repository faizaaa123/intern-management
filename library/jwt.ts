import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number
}

const DefaultSignOption: SignOption = {
    expiresIn: "1h"
}

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DefaultSignOption) {
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret_key!, options);
    return token
}

export function varifyJwtAccessToken(token: string) {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!)
        return decoded as JwtPayload
    } catch (error) {
        console.log(error)
        return null;
    }
}