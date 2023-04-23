import { Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsService } from './products.service';
import { ProductGetDto } from './dto/create-auth-dto';
export declare class ProductsController {
    private readonly productService;
    private prismaClient;
    constructor(productService: ProductsService, prismaClient: PrismaService);
    create(payload: any, res: Response): Promise<Response>;
    findAll(listproduct: any, res: Response): Promise<Response>;
    findOne(uuid: ProductGetDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(uuid: ProductGetDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, payload: any, res: Response): Promise<Response>;
}
