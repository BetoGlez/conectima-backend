import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";

@ObjectType()
export class User {
    @Field(() => ID)
    public id?: string;

    @Field()
    @prop({ required: true })
    public email: string;

    @Field()
    @prop({ required: true })
    public username: string;

    @Field({nullable: true})
    public token?: string;

    @prop({ required: true })
    public password: string;
}

export const UserModel = getModelForClass(User);
