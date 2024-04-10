import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login(LoginDto: LoginDto): Promise<any> {
        const { username, password } = LoginDto;

        const user = await this.prismaService.users.findFirst({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new NotFoundException('Senha inválida');
        }

        return user;
    }

    async register(registerDto: RegisterUsersDto): Promise<any> {
        const data = {
            username: registerDto.username,
            password: await bcrypt.hash(registerDto.password, 10),
        };

        const user = await this.usersService.registerUser(data);

        return user;
    }
}
