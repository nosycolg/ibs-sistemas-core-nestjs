import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUsersDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) {}

    @Post('/login')
    async login(@Req() req: Request, @Res() res: Response, @Body() loginDto: LoginDto): Promise<any> {
        try {
            const data = await this.authService.login(loginDto);
            return res.status(200).json({
                username: data.username,
                token: this.jwtService.sign({ id: data.id }),
            });
        } catch (err) {
            return res.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }

    @Post('/register')
    async register(@Req() req: Request, @Res() res: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {
        try {
            const data = await this.authService.register(registerDto);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }
}
