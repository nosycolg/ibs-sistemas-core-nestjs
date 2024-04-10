import { Prisma } from "@prisma/client";

export class People implements Prisma.PeopleCreateInput{
  name: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  addresses?: Prisma.AddressCreateNestedManyWithoutPeopleInput;
}