import { Field, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class SpProgress {
    @Field({nullable: true})
    @prop()
    public date?: string;

    @Field({nullable: true})
    @prop()
    public sp?: number;
}