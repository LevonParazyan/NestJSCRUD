import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    userName: string

    @Prop()
    email: string

    @Prop({ type: Object })
    address: object
}

export const UserSchema = SchemaFactory.createForClass(User);