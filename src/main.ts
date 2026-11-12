import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos que no están en el DTO
      forbidNonWhitelisted: true, // responde 400 si llegan campos extra
      transform: true, // aplica @Transform (trim del nombre)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
