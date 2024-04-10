import { ConflictException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUser(): Promise<Users[]> {
        return this.prisma.users.findMany();
    }

    async registerUser(data: { username: string; password: string }): Promise<Users> {
        try {
            const existing = await this.prisma.users.findFirst({
                where: {
                    username: data.username
                },
            });

            if (existing) {
                throw new ConflictException('username already exists');
            }

            return this.prisma.users.create({
                data,
            });
        } catch (err) {
            console.error(err);
            throw new Error("Error while registering user.");
        }
    }
}
