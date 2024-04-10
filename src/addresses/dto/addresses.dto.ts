import { IsString } from 'class-validator';

export class Addresses {
    @IsString()
    cep: string;

    @IsString()
    street: string;

    @IsString()
    streetNumber: string;

    @IsString()
    district: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsString()
    complement: string;
}
