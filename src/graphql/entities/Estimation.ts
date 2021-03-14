import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Estimation {
    @Field(() => Float)
    public optimistic: number;

    @Field(() => Float)
    public mostLikely: number;

    @Field(() => Float)
    public pesimistic: number;

    @Field(() => Float)
    public originalEstimation: number;
}