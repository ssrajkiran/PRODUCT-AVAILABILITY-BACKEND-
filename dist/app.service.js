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
exports.AppService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const uuid = __importStar(require("uuid"));
const generateToken_1 = __importDefault(require("./helpers/jwt/generateToken"));
const response_1 = __importDefault(require("./helpers/response"));
const statusCode_1 = require("./helpers/statusCode");
let AppService = class AppService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.bucketName = process.env.AWS_BUCKETNAME;
        this.region = process.env.AWS_BUCKETREGION;
        this.accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
        this.secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;
        this.client = new client_s3_1.S3Client({
            region: process.env.AWS_BUCKETREGION,
            credentials: {
                accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
                secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
            },
        });
    }
    checkServer() {
        return (0, response_1.default)('Going Good', { message: 'Going Good' }, statusCode_1.STATUS_CODE.success);
    }
    async uploadS3(files) {
        const params = files.map((file) => {
            return {
                Bucket: this.bucketName,
                Key: `${uuid.v4()}`,
                Body: file.buffer,
                ACL: 'public-read',
                CacheControl: 'max-age=6400',
                ContentType: file.mimetype,
            };
        });
        return await Promise.all(params.map(async (param) => {
            try {
                const parallelUploads3 = new lib_storage_1.Upload({
                    client: this.client,
                    params: param,
                });
                return await parallelUploads3.done();
            }
            catch (e) {
                console.log(e);
            }
        }));
    }
    async deleteS3(key) {
        console.log(key);
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        try {
            const response = await this.client.send(command);
            console.log(response);
            return response;
        }
        catch (err) {
            console.error(err);
        }
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