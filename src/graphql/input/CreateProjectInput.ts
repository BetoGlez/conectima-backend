import { Field, InputType } from "type-graphql";
import { IsNotEmpty } from "class-validator";

import { ApiConstants } from "../../api.constants";
import { IsDateFormatValid } from "../../validators/isDateFormatValid";

@InputType()
export class CreateProjectInput {

    @Field()
    @IsNotEmpty({message: ApiConstants.errorCodes.EMPTY_FIELD})
    public spreadSheetId: string;

    @Field()
    @IsNotEmpty({message: ApiConstants.errorCodes.EMPTY_FIELD})
    public name: string;

    @Field()
    @IsDateFormatValid({ message: ApiConstants.errorCodes.INVALID_DATE })
    public startDate: string;
}