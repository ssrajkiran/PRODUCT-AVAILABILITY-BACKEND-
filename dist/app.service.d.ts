import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/appDto';
import { responseDto } from './helpers/response';
export declare class AppService {
    private jwtService;
    constructor(jwtService: JwtService);
    checkServer(): Promise<responseDto>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<unknown>;
}
