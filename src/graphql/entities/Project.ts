import { Field, ID, ObjectType } from "type-graphql";
import { prop, getModelForClass, Ref, plugin, modelOptions, Severity } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";

import { Dedication } from "./Dedication";
import { Sprint } from "./Sprint";

@plugin(autopopulate)
@modelOptions({ options: { allowMixed: Severity.ALLOW }})
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

    @Field()
    @prop({ required: true })
    public startDate: string;

    @Field(() => [Sprint], { nullable: true })
    @prop({ ref: () => Sprint, autopopulate: true })
    public sprints?: Array<Ref<Sprint>>;

    @Field(() => Sprint, { nullable: true })
    @prop({ ref: () => Sprint, autopopulate: true })
    public activeSprint?: Ref<Sprint>;

    @Field(() => [Dedication], { nullable: true })
    @prop()
    public dedications?: Array<Dedication>;
}

export const ProjectModel = getModelForClass(Project);
