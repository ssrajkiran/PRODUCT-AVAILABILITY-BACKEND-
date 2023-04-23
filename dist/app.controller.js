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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const appDto_1 = require("./dto/appDto");
const jwt_refresh_auth_guard_1 = require("./helpers/jwt/jwt-refresh.auth.guard");
const response_1 = __importDefault(require("./helpers/response"));
const statusCode_1 = require("./helpers/statusCode");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    checkServer() {
        return this.appService.checkServer();
    }
    async uploadFile(body, files) {
        let data = await this.appService.uploadS3(files.files);
        return data;
    }
    async deleteFile(Param) {
        console.log(Param);
        let del = await this.appService.deleteS3(Param);
        return del;
    }
    async refreshTokens(refreshTokenDto, res) {
        try {
            let data = refreshTokenDto.headers.authorization.split(' ')[1];
            let token = await this.appService.refreshTokens({ refreshToken: data });
            return res
                .status(statusCode_1.STATUS_CODE.success)
                .json(await (0, response_1.default)(`Access Token`, { token }, 200, true, ''));
        }
        catch (error) {
            return res
                .status(statusCode_1.STATUS_CODE.internalServerError)
                .json(await (0, response_1.default)(`Invalid user`, {}, statusCode_1.STATUS_CODE.internalServerError, false, error.message));
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "checkServer", null);
__decorate([
    (0, swagger_1.ApiTags)('upload'),
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'files', maxCount: 10 }])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appDto_1.FilesUploadDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiTags)('upload'),
    (0, common_1.Delete)('upload'),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteFile", null);
__decorate([
    (0, swagger_1.ApiTags)('refresh'),
    (0, common_1.Get)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JwtRefreshGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshTokens", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map