import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { AddressesService } from './addresses.service';
import { Addresses } from './dto/addresses.dto';

@Controller()
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @Get('/addresses/:id')
    @UseGuards(JwtAuthGuard)
    async getAddresses(@Req() req: Request, @Res() res: Response, @Query() params: { limit: string; page: string; category: string; search: string }, @Param() personId: { id: string }) {
        try {
            const data = await this.addressesService.getAddresses(params, personId);
            return res.json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    @Post('/address/:id')
    @UseGuards(JwtAuthGuard)
    async createPerson(@Req() req: Request, @Res() res: Response, @Body() data: Addresses, @Param() personId: { id: string }) {
        try {
            const person = await this.addressesService.insertAddress(data, personId);
            return res.status(200).json(person);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    @Put('/address/:id')
    @UseGuards(JwtAuthGuard)
    async updatePerson(@Req() req: Request, @Res() res: Response, @Param() param: { id: string }, @Body() data: Addresses) {
        try {
            const person = await this.addressesService.updateAddress(param, data);
            return res.status(200).json(person);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    @Delete('/address/:id')
    @UseGuards(JwtAuthGuard)
    async deletePerson(@Req() req: Request, @Res() res: Response, @Param() param: { id: string }) {
        try {
            const person = await this.addressesService.deleteAddress(param);
            return res.status(200).json(person);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
