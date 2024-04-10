import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Addresses } from './dto/addresses.dto';

@Injectable()
export class AddressesService {
    constructor(private prisma: PrismaService) {}

    async getAddresses(params: { limit: string; page: string; category: string; search: string }, personId: { id: string }) {
        const maxResults = params.limit ? Number(params.limit) : 10;
        const offset = params.page ? (Number(params.page) - 1) * maxResults : 0;

        let whereClause = {};

        if (personId) {
            whereClause = {
                peopleId: Number(personId.id),
            };
        }

        if (params.category && params.search) {
            const category = params.category.toLowerCase();
            const searchValue = params.search.toLowerCase();
            if (params.category === 'name') {
                whereClause[category] = { contains: searchValue };
            } else {
                whereClause[category] = searchValue;
            }
        }

        const addresses = await this.prisma.addresses.findMany({
            skip: offset,
            take: maxResults,
            where: whereClause,
        });

        const count = await this.prisma.addresses.count({
            where: whereClause,
        });

        return {
            total: count,
            max_results: maxResults,
            page: Number(params.page),
            pages: Math.ceil(count / maxResults),
            results: addresses,
        };
    }

    async insertAddress(body: Addresses, personId: { id: string }) {
        const { cep, street, streetNumber, city, country, district, state, complement } = body;

        if (!cep || !street || !streetNumber || !city || !country || !district || !state) {
            throw new NotFoundException('required fields!');
        }

        const data = await this.prisma.addresses.create({
            data: {
                cep,
                street,
                streetNumber,
                city,
                country,
                district,
                state,
                complement,
                People: {
                    connect: {
                        id: Number(personId.id),
                    },
                },
            },
        });

        return data;
    }

    async updateAddress(param: { id: string }, body: Addresses) {
        const { cep, street, streetNumber, city, country, district, state } = body;
        const address = this.prisma.addresses.findUnique({ where: { id: Number(param.id) } });

        if (!address) {
            throw new NotFoundException('Person does not exist');
        }

        if (!cep || !street || !streetNumber || !city || !country || !district || !state) {
            throw new NotFoundException('Required fields missing');
        }

        if (
            cep == (await address).cep &&
            street == (await address).street &&
            streetNumber == (await address).streetNumber &&
            district == (await address).district &&
            city == (await address).city &&
            state == (await address).state &&
            country == (await address).country
        ) {
            throw new NotFoundException('Data cannot be the same as existing data');
        }

        const data = this.prisma.addresses.update({
            where: { id: Number(param.id) },
            data: body,
        });

        return data;
    }

    async deleteAddress(param: { id: string }) {
        const data = await this.prisma.addresses.delete({ where: { id: Number(param.id) } });
        return data;
    }
}
