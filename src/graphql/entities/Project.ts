import { Field, ID, ObjectType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

import { Dedication } from "./Dedication";
import { Sprint } from "./Sprint";

@ObjectType()
export class Project {
    @Field(() => ID)
    public id?: string;

    @Field()
    @prop({ required: true })
    public name: string;

    @Field()
    @prop({ required: true })
    public spreadSheetId: string;

    @Field(() => [Sprint], { nullable: true })
    public sprints?: Array<Sprint>;

    @Field(() => Sprint, { nullable: true })
    public activeSprint?: Sprint;

    @Field()
    @prop({ required: true })
    public startDate: string;

    @Field(() => [Dedication], { nullable: true })
    public dedications?: Array<Dedication>;
}

export const ProjectModel = getModelForClass(Project);
