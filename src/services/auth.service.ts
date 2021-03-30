import { Service } from "typedi";
import { AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcryptjs";

import { User, UserModel } from "../graphql/entities/User";
import { LoginInput } from "../graphql/input/LoginInput";
import { ApiConstants } from "../api.constants";
import { generateToken } from "../utils/tokens";

@Service()
export class AuthService {
    public async login({ email, password }: LoginInput): Promise<User> {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw new AuthenticationError(ApiConstants.errorCodes.USER_NOT_FOUND );
        }
        const pwdsMatch = await bcrypt.compare(password, user.password);
        if (!pwdsMatch) {
            throw new AuthenticationError(ApiConstants.errorCodes.INVALID_CREDENTIALS );
        }
        const authToken = generateToken(user);
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            token: authToken
        } as User;
    }
}