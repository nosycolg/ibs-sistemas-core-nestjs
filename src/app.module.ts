import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PeopleModule } from './people/people.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [UsersModule, PeopleModule, AddressesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
