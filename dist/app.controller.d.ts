/// <reference types="multer" />
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { FilesUploadDto } from './dto/appDto';
import { responseDto } from './helpers/response';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    checkServer(): Promise<responseDto>;
    uploadFile(body: FilesUploadDto, files: {
        files?: Express.Multer.File[];
    }): Promise<(import("@aws-sdk/client-s3").AbortMultipartUploadCommandOutput | import("@aws-sdk/client-s3").CompleteMultipartUploadCommandOutput)[]>;
    deleteFile(Param: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    refreshTokens(refreshTokenDto: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
