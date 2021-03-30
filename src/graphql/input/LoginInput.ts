import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

import { ApiConstants } from "../../api.constants";

@InputType()
export class LoginInput {
    @Field()
    @IsEmail({}, { message: ApiConstants.errorCodes.INVALID_EMAIL })
    public email: string;

    @Field()
    @MinLength(ApiConstants.MIN_PASSWORD_LENGTH, { message: ApiConstants.errorCodes.SHORT_PASSWORD })
    public password: string;
}