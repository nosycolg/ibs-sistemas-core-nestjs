import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { People } from '@prisma/client';

@Injectable()
export class PeopleService {
    constructor(private prisma: PrismaService) {}

    async getPeople(params: { limit: string; page: string; category: string; search: string }) {
        const maxResults = params.limit ? Number(params.limit) : 10;
        const offset = params.page ? (Number(params.page) - 1) * maxResults : 0;

        const whereClause = {};

        if (params.category && params.search) {
            const category = params.category.toLowerCase();
            const searchValue = params.search.toLowerCase();
            if (params.category === 'name') {
                whereClause[category] = { contains: searchValue };
            } else {
                whereClause[category] = searchValue;
            }
        }

        const people = await this.prisma.people.findMany({
            skip: offset,
            take: maxResults,
            where: whereClause,
        });

        const count = await this.prisma.people.count();

        return {
            total: count,
            max_results: maxResults,
            page: Number(params.page),
            pages: Math.ceil(count / maxResults),
            results: people,
        };
    }

    async createPerson(body: People) {
        const { name, gender, dateOfBirth, maritalStatus } = body;

        if (!name || !gender || !dateOfBirth || !maritalStatus) {
            throw new NotFoundException('required fields!');
        }

        const data = await this.prisma.people.create({
            data: {
                name,
                gender,
                dateOfBirth,
                maritalStatus,
            },
        });

        return data;
    }

    async updatePerson(param: { id: string }, body: People) {
        const person = this.prisma.people.findUnique({ where: { id: Number(param.id) } });

        if (!person) {
            throw new NotFoundException('Person dont exist');
        }

        const { name, gender, dateOfBirth, maritalStatus } = body;

        if (!name || !gender || !dateOfBirth || !maritalStatus) {
            throw new NotFoundException('required fields!');
        }

        const data = this.prisma.people.update({
            where: { id: Number(param.id) },
            data: body,
        });

        return data;
    }

    async deletePerson(param: { id: string }) {
        const data = await this.prisma.people.delete({ where: { id: Number(param.id) } });
        return data;
    }
}
