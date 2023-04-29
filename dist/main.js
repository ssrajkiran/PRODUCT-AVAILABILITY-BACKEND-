"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    if (process.env.LOAD_DATA) {
    }
    else {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        const config = new swagger_1.DocumentBuilder()
            .setTitle('ProductFinder')
            .setDescription('The ProductFinder API description')
            .setVersion('1.0')
            .addTag('ProductFinder').addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(process.env.PORT);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map