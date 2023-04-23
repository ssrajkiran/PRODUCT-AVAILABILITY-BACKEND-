import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleAdmin } from './admin/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JwtRefreshStrategy } from './helpers/jwt/jwt.refresh.stratergy';
import { JwtStrategy } from './helpers/jwt/jwt.stratergy';
import { AppLoggerMiddleware } from './helpers/responseTime';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    AuthModuleAdmin,
    ShopsModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
