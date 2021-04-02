import { Field, Float, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Dedication {
    @Field({ nullable: true })
    @prop()
    public user?: string;

    @Field(() => Float, { nullable: true })
    @prop()
    public currentHours?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public expectedHoursPerDay?: number;
}