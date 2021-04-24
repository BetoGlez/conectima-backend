import { Field, ID, ObjectType, Root } from "type-graphql";
import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";

import { Dedication } from "./Dedication";
import { Issue } from "./Issue";
import { SprintStatistics } from "./SprintStatistics";
import { SpProgress } from "./SpProgress";

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

    @Field(() => [SpProgress], { nullable: true })
    @prop()
    public spsProgress?: Array<SpProgress>;

    @Field()
    public issueCount(@Root("_doc") parent: Sprint): number {
        return parent.issues?.length || 0;
    }
}

export const SprintModel = getModelForClass(Sprint);