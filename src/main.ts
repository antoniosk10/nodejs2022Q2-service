import { logger } from './common/logger/logger.utils';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/HttpExceptionFilter';
import { MyLogger } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(MyLogger);
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();

process.on('unhandledRejection', (reason, promise) => {
  logger(
    `Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`,
    '',
    'ERROR',
  );
});

process.on('uncaughtException', (err, origin) => {
  logger(
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`,
    '',
    'ERROR',
  );
});
