import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "crypto";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        const err = createHttpError(400, "All filed are reqired");
        return next(err);
    }
    // Database call.
    const user = await userModel.findOne({ email: email });
    if (user) {
        const error = createHttpError(
            400,
            "user already exists with this email"
        );
        return next(error);
    }

    /// password -> hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    // Token generation

    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
        expiresIn: "7d",
        algorithm: "HS256",
    });

    res.json({ accessToken: token });
};

export { createUser };
