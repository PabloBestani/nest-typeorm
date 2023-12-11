import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agrega siempre esto a la URL
  app.setGlobalPrefix("api/v1");

  // Config para validacion de datos entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.listen(process.env.PORT || 3001);
  console.log(`Server listening on port ${process.env.PORT}`);
}
bootstrap();
