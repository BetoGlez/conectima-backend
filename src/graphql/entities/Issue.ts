import { Field, Float, ObjectType, Root } from "type-graphql";
import { prop } from "@typegoose/typegoose";

import { ApiConstants } from "../../api.constants";
import { Estimation } from "./Estimation";

@ObjectType()
export class Issue {
    @Field({nullable: true})
    public repoNumber?(@Root() parent: Issue): string {
        return parent.title.substr(0, parent.title.indexOf(ApiConstants.COLON_CHAR));
    }

    @Field({ nullable: true })
    @prop()
    public title: string;

    @Field({ nullable: true })
    @prop()
    public responsible?: string;

    @Field(() => Estimation, { nullable: true })
    @prop()
    public estimation?: Estimation;

    @Field(() => Float, { nullable: true })
    @prop()
    public progress?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public priority?: number;

    @Field(() => Float, { nullable: true })
    @prop()
    public clientValue?: number;
}