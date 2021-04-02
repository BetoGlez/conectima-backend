import { Field, ID, ObjectType } from "type-graphql";
import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";

import { Dedication } from "./Dedication";
import { Issue } from "./Issue";
import { SprintStatistics } from "./SprintStatistics";

@modelOptions({ options: { allowMixed: Severity.ALLOW }})
@ObjectType()
export class Sprint {
    @Field(() => ID)
    public id?: string;

    @prop({required: true})
    public projectId: string;

    @Field()
    @prop({ required: true })
    public version: string;

    @Field(() => SprintStatistics, { nullable: true })
    @prop()
    public statistics?: SprintStatistics;

    @Field(() => [Issue], { nullable: true })
    @prop()
    public issues?: Array<Issue>;

    @Field(() => [Dedication], { nullable: true })
    @prop()
    public dedications?: Array<Dedication>;
}

export const SprintModel = getModelForClass(Sprint);