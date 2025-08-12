import type { Request, Response } from "express"; // tells compiler these are just types and don't find them for real at runtime
import User from "../models/User.model";
import bcrypt from "bcrypt";
import { getUser, setUser } from "../middlewares/auth";

const registerController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please register first." });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //send a cookie with the respobse
        const token = setUser(user);

        res.cookie("token", token, {
            httpOnly: true, // Prevents JS access — good for security
            secure: true,
            maxAge: 1000 * 60 * 60, // 1 hour
        });
        return res
            .status(200)
            .json({ message: "Successfully logged you in", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const authController = (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = getUser(token);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json({ message: "User authorized", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logoutController = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

export {
    registerController,
    loginController,
    authController,
    logoutController,
};
