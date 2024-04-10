import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { PrismaService } from 'src/prisma.service';
import { AddressesController } from './addresses.controller';

@Module({
    controllers: [AddressesController],
    providers: [AddressesService, PrismaService],
})
export class AddressesModule {}
