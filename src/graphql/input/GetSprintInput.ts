import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

import { ApiConstants } from "../../api.constants";

@InputType()
export class GetSprintInput {
    @Field()
    @IsNotEmpty({message: ApiConstants.errorCodes.EMPTY_FIELD})
    public projectId: string;

    @Field()
    @IsNotEmpty({message: ApiConstants.errorCodes.EMPTY_FIELD})
    public sprintVersion: string;
}