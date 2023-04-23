"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ProductsService = class ProductsService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async create(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await this.prismaClient.product.create({
                    data: payload,
                });
                return resolve(products);
            }
            catch (error) {
                reject(`${error.message}`);
            }
        });
    }
    findAll(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await this.prismaClient.product.findMany(payload);
                if (!product) {
                    return reject('Error While retriving Product');
                }
                return resolve(product);
            }
            catch (error) {
                if (JSON.stringify(error.message).includes('`include` or `select`, but not both at the same time')) {
                    return reject('Use either select or include');
                }
                return reject(`${error.message}`);
            }
        });
    }
    findOne(uuid) {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await this.prismaClient.product.findFirst({
                    where: { uuid },
                });
                if (!product) {
                    return reject('Error While retriving Product');
                }
                return resolve(product);
            }
            catch (error) {
                if (JSON.stringify(error.message).includes('`include` or `select`, but not both at the same time')) {
                    return reject('Use either select or include');
                }
                return reject(`${error.message}`);
            }
        });
    }
    update(uuid, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let Product = await this.prismaClient.product.update({
                    where: { uuid },
                    data: payload,
                });
                if (!Product) {
                    return reject('Product Sucessfully Updated');
                }
                return resolve(Product);
            }
            catch (error) {
                if (JSON.stringify(error.message).includes('Product to update not found')) {
                    return reject('No Record Found');
                }
                return reject(`${error.message}`);
            }
        });
    }
    remove(uuid) {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await this.prismaClient.product.update({
                    where: { uuid },
                    data: { status: false, deleted_at: new Date().toISOString() },
                });
                if (!products) {
                    return reject('No Product Found');
                }
                return resolve(products);
            }
            catch (error) {
                if (JSON.stringify(error.message).includes('Record to update not found')) {
                    return reject('No Record Found');
                }
                return reject(`${error.message}`);
            }
        });
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map