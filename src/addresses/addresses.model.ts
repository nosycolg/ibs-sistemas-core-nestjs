import { Prisma } from "@prisma/client";

export class addresses implements Prisma.AddressesCreateInput{
  cep: string;
  street: string;
  streetNumber: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  People?: Prisma.PeopleCreateNestedOneWithoutAddressesInput;
}