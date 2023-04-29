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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const generateToken_1 = __importDefault(require("./helpers/jwt/generateToken"));
const response_1 = __importDefault(require("./helpers/response"));
const statusCode_1 = require("./helpers/statusCode");
let AppService = class AppService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    checkServer() {
        return (0, response_1.default)('Going Good', { message: 'Going Good' }, statusCode_1.STATUS_CODE.success);
    }
    async refreshTokens(refreshTokenDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const { refreshToken } = refreshTokenDto;
                const decoded = this.jwtService.verify(refreshToken, {
                    secret: process.env.REFRESHTOKEN,
                });
                delete decoded.iat;
                delete decoded.exp;
                const tokens = await (0, generateToken_1.default)(decoded, false);
                return resolve(tokens);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map