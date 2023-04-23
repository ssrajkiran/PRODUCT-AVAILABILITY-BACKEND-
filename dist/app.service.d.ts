/// <reference types="multer" />
import { S3Client } from '@aws-sdk/client-s3';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/appDto';
import { responseDto } from './helpers/response';
export declare class AppService {
    private jwtService;
    bucketName: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    client: S3Client;
    constructor(jwtService: JwtService);
    checkServer(): Promise<responseDto>;
    uploadS3(files: Express.Multer.File[]): Promise<(import("@aws-sdk/client-s3").AbortMultipartUploadCommandOutput | import("@aws-sdk/client-s3").CompleteMultipartUploadCommandOutput)[]>;
    deleteS3(key: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<unknown>;
}
