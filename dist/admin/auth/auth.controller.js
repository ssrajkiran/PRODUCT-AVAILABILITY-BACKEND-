"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const _ = __importStar(require("lodash"));
const response_1 = __importDefault(require("../../helpers/response"));
const statusCode_1 = require("../../helpers/statusCode");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const update_auth_dto_1 = require("./dto/update-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(createAuthDto, res) {
        try {
            console.log(createAuthDto);
            const user = await this.authService.signUp(createAuthDto);
            return res
                .status(statusCode_1.STATUS_CODE.created)
                .json(await (0, response_1.default)(`User Created Successfully!`, { user }, 201, true, ''));
        }
        catch (error) {
            console.log(error);
            return res
                .status(_.has(error, 'code') ? error === null || error === void 0 ? void 0 : error.code : statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`user creation Failed`, {}, _.has(error, 'code')
                ? error === null || error === void 0 ? void 0 : error.code
                : statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    async signIn(createAuthDto, res) {
        try {
            const data = await this.authService.signIn(createAuthDto);
            return res
                .status(statusCode_1.STATUS_CODE.success)
                .json(await (0, response_1.default)(`User Logged In Successfully!`, { data }, 200, true, ''));
        }
        catch (error) {
            console.log(error);
            return res
                .status(_.has(error, 'code') ? error === null || error === void 0 ? void 0 : error.code : statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Login Failed`, {}, _.has(error, 'code')
                ? error === null || error === void 0 ? void 0 : error.code
                : statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
    findAll() {
        return this.authService.findAll();
    }
    async findOne(id, res) {
        try {
            const user = await this.authService.findOne(id);
            return res
                .status(statusCode_1.STATUS_CODE.created)
                .json((0, response_1.default)(`Get user by Id`, { user }, 201, true, ''));
        }
        catch (error) {
            console.error(error);
            return res
                .status(statusCode_1.STATUS_CODE.badRequest)
                .json(await (0, response_1.default)(`fetching  User Failed`, {}, 400, false, error.message));
        }
    }
    update(id, updateAuthDto) {
        return this.authService.update(+id, updateAuthDto);
    }
    remove(id) {
        return this.authService.remove(+id);
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ description: 'User Created Successfully!' }),
    (0, common_1.Post)('signUp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'User Logged In Successfully!' }),
    (0, common_1.Post)('signIn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_auth_dto_1.UpdateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "remove", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map