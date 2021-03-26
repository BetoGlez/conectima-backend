import { Field, InputType } from "type-graphql";
import { IsNotEmpty } from "class-validator";

import { ApiConstants } from "../../../../api.constants";

@InputType()
export class CreateProjectInput {
    // TODO: Add a custom validator that verifies the spreadsheet Id can actually be linked
    @Field()
    @IsNotEmpty({message: ApiConstants.errorCodes.EMPTY_FIELD})
    public spreadSheetId: string;

    // TODO: Add a custom validator that verifies in database a project with same name doesn't exists already
    @Field()
    @IsNotEmpty({message: ApiConstants.errorCodes.EMPTY_FIELD})
    public name: string;

    @Field()
    public startDate: string;
}