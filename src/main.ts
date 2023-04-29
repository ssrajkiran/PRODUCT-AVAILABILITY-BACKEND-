import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { addBasicsData } from './helpers/seeder/seed';



async function bootstrap() {
  // UserDetails()
  if (process.env.LOAD_DATA) {
    // addBasicsData();
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const config = new DocumentBuilder()
      .setTitle('ProductFinder')
      .setDescription('The ProductFinder API description')
      .setVersion('1.0')
      .addTag('ProductFinder').addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT);
  }
}


bootstrap();
