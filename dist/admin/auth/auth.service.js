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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../database/prisma.service");
const statusCode_1 = require("../../helpers/statusCode");
const generateToken_1 = __importDefault(require("../../helpers/jwt/generateToken"));
const saltRounds = 10;
let AuthService = class AuthService {
    constructor(prismaClient, jwtService) {
        this.prismaClient = prismaClient;
        this.jwtService = jwtService;
    }
    async signUp(createAuthDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const { email_address } = createAuthDto;
                let user = await this.prismaClient.user.findFirst({
                    where: { email_address: email_address },
                });
                if (user) {
                    reject({
                        message: 'User Already Exist!',
                        code: statusCode_1.STATUS_CODE.badRequest,
                    });
                }
                if (!user) {
                    const newUser = this.prismaClient.user.create({
                        data: createAuthDto,
                    });
                    return resolve(newUser);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async signIn(createAuthDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const { email_address, password } = createAuthDto;
                console.log(email_address);
                let prevuser = await this.prismaClient.user.findFirst({
                    where: { email_address },
                });
                if (!prevuser) {
                    return reject({
                        message: 'Email not exist',
                        code: statusCode_1.STATUS_CODE.badRequest,
                    });
                }
                const match = await bcrypt.compare(password, prevuser.password);
                if (!match) {
                    return reject({
                        message: 'Wrong Password',
                        code: statusCode_1.STATUS_CODE.badRequest,
                    });
                }
                prevuser['password'] = null;
                let data = {
                    token: await (0, generateToken_1.default)(prevuser),
                    user: prevuser
                };
                return resolve(data);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.prismaClient.user.findUnique({
                    where: { id: id },
                });
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    update(id, updateAuthDto) {
        return new Promise(async (resolve, reject) => {
            try {
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map