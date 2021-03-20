import { Field, ObjectType } from "type-graphql";

import { Dedication } from "./Dedication";
import { Issue } from "./Issue";
import { SprintStatistics } from "./SprintStatistics";

@ObjectType()
export class Sprint {
    @Field()
    public version: string;

    @Field(() => SprintStatistics)
    public statistics: SprintStatistics;

    @Field(() => [Issue])
    public issues: Array<Issue>;

    @Field(() => [Dedication])
    public dedications: Array<Dedication>;
}