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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_1 = __importDefault(require("../helpers/response"));
const lodash_1 = __importDefault(require("lodash"));
const statusCode_1 = require("../helpers/statusCode");
const objectParser_1 = __importDefault(require("../helpers/objectParser"));
const prisma_service_1 = require("../database/prisma.service");
const products_service_1 = require("./products.service");
const create_auth_dto_1 = require("./dto/create-auth-dto");
let ProductsController = class ProductsController {
    constructor(productService, prismaClient) {
        this.productService = productService;
        this.prismaClient = prismaClient;
    }
    async create(payload, res) {
        try {
            const product = await this.productService.create(payload);
            return res
                .status(statusCode_1.STATUS_CODE.created)
                .json(await (0, response_1.default)(`Product Created Successfully!`, { product }, 201, true, ''));
        }
        catch (error) {
            console.log(error);
            return res
                .status(lodash_1.default.has(error, 'code') ? error === null || error === void 0 ? void 0 : error.code : statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Product creation Failed`, {}, lodash_1.default.has(error, 'code')
                ? error === null || error === void 0 ? void 0 : error.code
                : statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async findAll(listproduct, res) {
        try {
            const count = await this.prismaClient.product.count({
                where: listproduct.where,
            });
            let payload = (0, objectParser_1.default)(listproduct);
            this.productService
                .findAll(payload)
                .then(async (Products) => {
                return res
                    .status(statusCode_1.STATUS_CODE.success)
                    .json(await (0, response_1.default)(`Product List Successfully`, { count, Products }, statusCode_1.STATUS_CODE.success, true, ''));
            })
                .catch(async (err) => {
                common_1.Logger.error(err);
                return res
                    .status(statusCode_1.STATUS_CODE.badRequest)
                    .json(await (0, response_1.default)(`Product List Failed`, {}, statusCode_1.STATUS_CODE.badRequest, false, err));
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Product List Failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async findOne(uuid, res) {
        try {
            return this.productService
                .findOne(uuid.uuid)
                .then(async (kycDocumentType) => {
                return res
                    .status(statusCode_1.STATUS_CODE.success)
                    .json(await (0, response_1.default)(`Product Fetched Successfully`, { kycDocumentType }, statusCode_1.STATUS_CODE.success, true, ''));
            })
                .catch(async (err) => {
                common_1.Logger.error(err);
                return res
                    .status(statusCode_1.STATUS_CODE.badRequest)
                    .json(await (0, response_1.default)(`Product Fetching Failed`, {}, statusCode_1.STATUS_CODE.badRequest, false, err));
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Product List Failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async remove(uuid, res) {
        try {
            return this.productService
                .remove(uuid.uuid)
                .then(async (product) => {
                return res
                    .status(statusCode_1.STATUS_CODE.success)
                    .json(await (0, response_1.default)(`Product Deleted Successfully`, { product }, statusCode_1.STATUS_CODE.success, true, ''));
            })
                .catch(async (err) => {
                common_1.Logger.error(err);
                return res
                    .status(statusCode_1.STATUS_CODE.badRequest)
                    .json(await (0, response_1.default)(`Campaign deletion Failed`, {}, statusCode_1.STATUS_CODE.badRequest, false, err));
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Campaign deletion Failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async update(id, payload, res) {
        try {
            const data = await this.productService.update(id, payload);
            return res
                .status(statusCode_1.STATUS_CODE.success)
                .json(await (0, response_1.default)(`Campaign Product Successfully`, { data }, statusCode_1.STATUS_CODE.success, true, ''));
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Update Product failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ description: 'Campaign Created Successfully!' }),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ProductGetDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ProductGetDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        prisma_service_1.PrismaService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map