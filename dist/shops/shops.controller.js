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
exports.ShopsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_1 = __importDefault(require("../helpers/response"));
const lodash_1 = __importDefault(require("lodash"));
const statusCode_1 = require("../helpers/statusCode");
const objectParser_1 = __importDefault(require("../helpers/objectParser"));
const prisma_service_1 = require("../database/prisma.service");
const shops_service_1 = require("./shops.service");
const create_auth_dto_1 = require("./dto/create-auth-dto");
let ShopsController = class ShopsController {
    constructor(shopsService, prismaClient) {
        this.shopsService = shopsService;
        this.prismaClient = prismaClient;
    }
    async create(payload, res) {
        try {
            const shop = await this.shopsService.create(payload);
            return res
                .status(statusCode_1.STATUS_CODE.created)
                .json(await (0, response_1.default)(`Shop Created Successfully!`, { shop }, 201, true, ''));
        }
        catch (error) {
            console.log(error);
            return res
                .status(lodash_1.default.has(error, 'code') ? error === null || error === void 0 ? void 0 : error.code : statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Shop creation Failed`, {}, lodash_1.default.has(error, 'code')
                ? error === null || error === void 0 ? void 0 : error.code
                : statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async findAll(listshop, res) {
        try {
            const count = await this.prismaClient.shop.count({
                where: listshop.where,
            });
            let payload = (0, objectParser_1.default)(listshop);
            this.shopsService
                .findAll(payload)
                .then(async (CampaignList) => {
                return res
                    .status(statusCode_1.STATUS_CODE.success)
                    .json(await (0, response_1.default)(`Shop List Successfully`, { count, CampaignList }, statusCode_1.STATUS_CODE.success, true, ''));
            })
                .catch(async (err) => {
                common_1.Logger.error(err);
                return res
                    .status(statusCode_1.STATUS_CODE.badRequest)
                    .json(await (0, response_1.default)(`Shop List Failed`, {}, statusCode_1.STATUS_CODE.badRequest, false, err));
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Campaign List Failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async findOne(uuid, res) {
        try {
            return this.shopsService
                .findOne(uuid.uuid)
                .then(async (kycDocumentType) => {
                return res
                    .status(statusCode_1.STATUS_CODE.success)
                    .json(await (0, response_1.default)(`Campaign Fetched Successfully`, { kycDocumentType }, statusCode_1.STATUS_CODE.success, true, ''));
            })
                .catch(async (err) => {
                common_1.Logger.error(err);
                return res
                    .status(statusCode_1.STATUS_CODE.badRequest)
                    .json(await (0, response_1.default)(`Campaign Fetching Failed`, {}, statusCode_1.STATUS_CODE.badRequest, false, err));
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`KYC Document Type List Failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async remove(uuid, res) {
        try {
            return this.shopsService
                .remove(uuid.uuid)
                .then(async (campaign) => {
                return res
                    .status(statusCode_1.STATUS_CODE.success)
                    .json(await (0, response_1.default)(`Campaign Deleted Successfully`, { campaign }, statusCode_1.STATUS_CODE.success, true, ''));
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
            const data = await this.shopsService.update(id, payload);
            return res
                .status(statusCode_1.STATUS_CODE.success)
                .json(await (0, response_1.default)(`Campaign updated Successfully`, { data }, statusCode_1.STATUS_CODE.success, true, ''));
        }
        catch (error) {
            common_1.Logger.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Update Campaign failed`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
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
], ShopsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ShopGetDto, Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ShopGetDto, Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "update", null);
ShopsController = __decorate([
    (0, common_1.Controller)('shop'),
    __metadata("design:paramtypes", [shops_service_1.ShopsService,
        prisma_service_1.PrismaService])
], ShopsController);
exports.ShopsController = ShopsController;
//# sourceMappingURL=shops.controller.js.map