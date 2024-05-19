import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        const err = createHttpError(400, "All filed are reqired");
        return next(err);
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
        const error = createHttpError(
            400,
            "user already exists with this email"
        );
        return next(error);
    }

    res.json({ message: "User Created succefully" });
};

export { createUser };
