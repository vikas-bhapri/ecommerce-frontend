import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export type JWTDecoded = {
    sub: string;
    email: string;
    exp: number;
    role: string;
}

export default function verifyJWT(token: string) : JWTDecoded | null {
    console.log("JWT Secret: ", JWT_SECRET);
    console.log("JWT Token: ", token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTDecoded;
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}