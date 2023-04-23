import { Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';
import { ShopsService } from './shops.service';
import { ShopGetDto } from './dto/create-auth-dto';
export declare class ShopsController {
    private readonly shopsService;
    private prismaClient;
    constructor(shopsService: ShopsService, prismaClient: PrismaService);
    create(payload: any, res: Response): Promise<Response>;
    findAll(listshop: any, res: Response): Promise<Response>;
    findOne(uuid: ShopGetDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(uuid: ShopGetDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, payload: any, res: Response): Promise<Response>;
}
