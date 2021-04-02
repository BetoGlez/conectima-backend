import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

import { ApiConstants } from "../api.constants";
import { Context } from "../types/Context";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(ApiConstants.TOKEN_PREFIX)[1];
        const tokenKey = ApiConstants.AUTH_TOKEN_KEY;
        if (token && tokenKey) {
            try {
                const user = jwt.verify(token, tokenKey);
                if (user) {
                    return next();
                }
            } catch(err) {
                throw new AuthenticationError("Invalid or expired token");
            }
        }
        throw new AuthenticationError("Authentication token must be \"Bearer [token]");
    }
    throw new AuthenticationError("Authorization header must be provided");
};