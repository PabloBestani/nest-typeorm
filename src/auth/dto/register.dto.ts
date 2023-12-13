import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from 'class-transformer';
import { Role } from "../../common/enums/role.enum";

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

    @IsOptional()
    @IsEnum(Role)
    role: Role;
}