import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProjectInput {
    @Field()
    public spreadSheetId: string;

    @Field()
    public name: string;

    @Field()
    public startDate: string;
}