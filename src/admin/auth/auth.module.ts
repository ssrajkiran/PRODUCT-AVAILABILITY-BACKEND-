import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/database/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [

    PassportModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModuleAdmin {}
