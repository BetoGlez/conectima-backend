import { Field, InputType } from "type-graphql";

@InputType()
export class GetIssuesInput {
    @Field()
    public sheetId: string;

    @Field()
    public sprintVersion: string;
}