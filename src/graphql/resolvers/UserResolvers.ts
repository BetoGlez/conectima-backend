import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";

import { User } from "../entities/User";
import { LoginInput } from "../input/LoginInput";
import { AuthService } from "../../services/auth.service";

@Service()
@Resolver()
export class UserResolvers {

    public constructor(private authSrv: AuthService) {}

    @Mutation(() => User, { nullable: true })
    public async login(@Arg("loginInput") loginInput: LoginInput): Promise<User> {
        return await this.authSrv.login(loginInput);
    }
}