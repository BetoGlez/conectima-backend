import { Field, ObjectType } from "type-graphql";

import { SprintStatistics } from "./SprintStatistics";

@ObjectType()
export class Sprint {
    @Field()
    version: string;

    @Field(() => SprintStatistics)
    statistics: SprintStatistics;
}