import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Sprint {
    @Field()
    public version: string;

    @Field({nullable: true})
    public startDate: string;

    @Field({nullable: true})
    public releaseDate: string;

    @Field(() => Float)
    public duration: number;

    @Field(() => Float)
    public storyPoints: number;
}