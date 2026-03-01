import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(cookieParser());

  const port = config.getOrThrow<number>('HTTP_PORT');
  await app.listen(port);
  console.log(`Running on http://localhost:${port}`);
  console.log(`GraphQL running on http://localhost:${port}/graphql`);
}

bootstrap();
