"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./admin/auth/auth.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const jwt_refresh_stratergy_1 = require("./helpers/jwt/jwt.refresh.stratergy");
const jwt_stratergy_1 = require("./helpers/jwt/jwt.stratergy");
const responseTime_1 = require("./helpers/responseTime");
const shops_module_1 = require("./shops/shops.module");
const products_module_1 = require("./products/products.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(responseTime_1.AppLoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
            }),
            auth_module_1.AuthModuleAdmin,
            shops_module_1.ShopsModule,
            products_module_1.ProductsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_stratergy_1.JwtStrategy, jwt_refresh_stratergy_1.JwtRefreshStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map