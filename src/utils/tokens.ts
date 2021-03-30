import jwt from "jsonwebtoken";

import { ApiConstants } from "../api.constants";
import { User } from "../graphql/entities/User";

export const generateToken = (user: User) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, ApiConstants.AUTH_TOKEN_KEY, { expiresIn: ApiConstants.AUTH_TOKEN_EXPIRE });
};