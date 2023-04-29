import { Request, Response } from 'express';
import { AppService } from './app.service';
import { responseDto } from './helpers/response';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    checkServer(): Promise<responseDto>;
    refreshTokens(refreshTokenDto: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
