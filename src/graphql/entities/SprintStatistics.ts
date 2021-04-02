import { Field, Float, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class SprintStatistics {
    @Field(() => Float, { nullable: true })
    @prop()
    public originalEstimationSp?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public devEstimationSp?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public originalEstimationHours?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public devEstimationHours?: number;

    @Field({nullable: true})
    @prop()
    public startDate?: string;

    @Field({nullable: true})
    @prop()
    public releaseDate?: string;

    @Field(() => Float, { nullable: true })
    @prop()
    public workHoursPerDay?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public remainingWorkDays?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public originalDeviationPercentage?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public devDeviationPercentage?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public originalProgressPercentage?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public devProgressPercentage?: number;
}