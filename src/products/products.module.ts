import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from 'src/database/prisma.module';
import { PrismaService } from 'src/database/prisma.service';

@Module({
   imports:[PrismaModule],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
