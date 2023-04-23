import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [ShopsService],
  controllers: [ShopsController]
})
export class ShopsModule {}
