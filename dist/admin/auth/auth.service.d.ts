import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthService {
    private prismaClient;
    private jwtService;
    constructor(prismaClient: PrismaService, jwtService: JwtService);
    signUp(createAuthDto: any): Promise<unknown>;
    signIn(createAuthDto: LoginAuthDto): Promise<unknown>;
    findAll(): string;
    findOne(id: number): Promise<unknown>;
    update(id: number, updateAuthDto: UpdateAuthDto): Promise<unknown>;
    remove(id: number): string;
}
