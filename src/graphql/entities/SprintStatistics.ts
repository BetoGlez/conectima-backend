import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class SprintStatistics {
    @Field(() => Float)
    originalEstimationSp: number;

    @Field(() => Float)
    devEstimationSp: number;

    @Field(() => Float)
    originalEstimationHours: number;

    @Field(() => Float)
    devEstimationHours: number;

    @Field({nullable: true})
    startDate: string;

    @Field({nullable: true})
    releaseDate: string;

    @Field(() => Float)
    workHoursPerDay: number;

    @Field(() => Float)
    remainingWorkDays: number;

    @Field(() => Float)
    originalDeviationPercentage: number;

    @Field(() => Float)
    devDeviationPercentage: number;

    @Field(() => Float)
    originalProgressPercentage: number;

    @Field(() => Float)
    devProgressPercentage: number;
}