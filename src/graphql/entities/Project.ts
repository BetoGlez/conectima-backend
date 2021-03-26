import { Field, ID, ObjectType } from "type-graphql";

import { Dedication } from "./Dedication";
import { Sprint } from "./Sprint";

@ObjectType()
export class Project {
    @Field(() => ID)
    public id?: string;

    @Field()
    public name: string;

    @Field()
    public spreadSheetId: string;

    @Field(() => [Sprint], { nullable: true })
    public sprints?: Array<Sprint>;

    @Field(() => Sprint, { nullable: true })
    public activeSprint?: Sprint;

    @Field()
    public startDate: string;

    @Field(() => [Dedication], { nullable: true })
    public dedications?: Array<Dedication>;
}