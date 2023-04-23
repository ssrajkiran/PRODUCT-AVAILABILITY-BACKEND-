import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createAuthDto: CreateAuthDto, res: Response): Promise<Response>;
    signIn(createAuthDto: LoginAuthDto, res: Response): Promise<Response>;
    findAll(): string;
    findOne(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<unknown>;
    remove(id: string): string;
}
