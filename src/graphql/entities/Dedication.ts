import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Dedication {
    @Field()
    public user: string;

    @Field(() => Float)
    public currentHours: number;

    @Field(() => Float)
    public expectedHoursPerDay: number;
}