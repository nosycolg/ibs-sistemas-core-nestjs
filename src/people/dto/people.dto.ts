import { IsString } from 'class-validator';

export class People {
    @IsString()
    name: string;

    @IsString()
    gender: string;

    @IsString()
    dateOfBirth: string;

    @IsString()
    maritalStatus: string;
}
