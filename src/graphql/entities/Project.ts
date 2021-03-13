import { Field, ID, ObjectType } from "type-graphql";

import { Sprint } from "./Sprint";

@ObjectType()
export class Project {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    spreadSheetId: string;

    @Field(() => [Sprint])
    sprints: Array<Sprint>;
}