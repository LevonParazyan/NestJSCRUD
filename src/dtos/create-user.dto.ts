import { IsEmail, IsNotEmpty, IsObject, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    readonly userName: string

    @IsString()
    @MaxLength(30)
    @IsEmail()
    readonly email: string

    @IsObject()
    readonly address: object

}