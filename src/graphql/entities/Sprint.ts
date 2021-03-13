import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Sprint {
    @Field()
    public id: string;

    @Field(() => [String])
    public issues: Array<string>;
}