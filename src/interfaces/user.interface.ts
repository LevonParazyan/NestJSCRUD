import { Document } from "mongoose";

export interface UserInterface extends Document {
    readonly name: string;
    readonly userName: string;
    readonly email: string;
    readonly address: object;
}