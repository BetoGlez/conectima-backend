import { Field, Float, ObjectType, Root } from "type-graphql";

import { ApiConstants } from "../../api.constants";
import { Estimation } from "./Estimation";

@ObjectType()
export class Issue {
    @Field({nullable: true})
    public repoNumber?(@Root() parent: Issue): string {
        return parent.title.substr(0, parent.title.indexOf(ApiConstants.COLON_CHAR));
    }

    @Field()
    public title: string;

    @Field()
    public responsible: string;

    @Field(() => Estimation)
    public estimation: Estimation;

    @Field(() => Float)
    public progress: number;

    @Field(() => Float)
    public priority: number;

    @Field(() => Float)
    public clientValue: number;
}