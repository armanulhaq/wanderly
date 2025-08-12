// auth.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface DecodedUser {
    email: string;
    name: string;
}

export const getUser = (token: string): DecodedUser | null => {
    if (!token) {
        return null;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    return decodedToken;
};

export const setUser = (user: DecodedUser): string => {
    return jwt.sign(
        {
            email: user.email,
            name: user.name,
        },
        process.env.JWT_SECRET!
    );
};
