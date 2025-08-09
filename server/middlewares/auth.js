import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getUser = (token) => {
    if (!token) {
        return null;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
};

const setUser = (user) => {
    return jwt.sign(
        {
            email: user.email,
            name: user.name,
        },
        process.env.JWT_SECRET
    );
};

export { getUser, setUser };
