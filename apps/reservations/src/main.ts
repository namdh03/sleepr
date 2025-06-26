import { NestFactory } from '@nestjs/core';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  if (port) {
    await app.listen(port);
  } else {
    throw new InternalServerErrorException(
      'PORT is not defined in environment variables.',
    );
  }
}
void bootstrap();
