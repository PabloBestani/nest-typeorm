import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from 'class-transformer';

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    password: string;

    @IsString()
    role: string;
}