import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('users')
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const users = await this.usersService.getAllUser();
            return res.json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
