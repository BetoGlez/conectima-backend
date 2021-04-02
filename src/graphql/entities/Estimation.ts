import { Field, Float, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class Estimation {
    @Field(() => Float, { nullable: true })
    @prop()
    public optimistic?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public mostLikely?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public pesimistic?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public originalEstimation?: number;
}