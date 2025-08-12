import express from "express";
import {
    registerController,
    loginController,
    authController,
    logoutController,
} from "../controller/authentication.controller";

const authenticationRoute = express.Router();

authenticationRoute.post("/register", registerController);
authenticationRoute.post("/login", loginController);
authenticationRoute.post("/me", authController);
authenticationRoute.post("/logout", logoutController);

export default authenticationRoute;
