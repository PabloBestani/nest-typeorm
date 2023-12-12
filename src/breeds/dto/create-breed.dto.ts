import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateBreedDto {

    @IsString()
    @MinLength(3)
    @MaxLength(45)
    name: string;
    
}
