import { PrismaService } from 'src/database/prisma.service';
import { prismaFilterOptions } from 'src/helpers/objectParser';
export declare class ProductsService {
    private prismaClient;
    constructor(prismaClient: PrismaService);
    create(payload: any): Promise<unknown>;
    findAll(payload: prismaFilterOptions): Promise<unknown>;
    findOne(uuid: string): Promise<unknown>;
    update(uuid: string, payload: any): Promise<unknown>;
    remove(uuid: string): Promise<unknown>;
}
