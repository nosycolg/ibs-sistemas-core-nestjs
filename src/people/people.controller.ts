import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

import { People } from '@prisma/client';

@Controller()
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get('/people')
    async getPeople(@Req() req: Request, @Res() res: Response, @Query() params: { limit: string; page: string; category: string; search: string }) {
        try {
            const data = await this.peopleService.getPeople(params);
            return res.json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    @Post('/person')
    @UseGuards(JwtAuthGuard)
    async createPerson(@Req() req: Request, @Res() res: Response, @Body() data: People) {
        try {
            const person = await this.peopleService.createPerson(data);
            return res.status(200).json(person);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    @Put('/person/:id')
    @UseGuards(JwtAuthGuard)
    async updatePerson(@Req() req: Request, @Res() res: Response, @Param() param: { id: string }, @Body() data: People) {
        try {
            const person = await this.peopleService.updatePerson(param, data);
            return res.status(200).json(person);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    @Delete('/person/:id')
    @UseGuards(JwtAuthGuard)
    async deletePerson(@Req() req: Request, @Res() res: Response, @Param() param: { id: string }) {
        try {
            const person = await this.peopleService.deletePerson(param);
            return res.status(200).json(person);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
