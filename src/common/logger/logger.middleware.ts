import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} Query Params: ${JSON.stringify(
          query,
        )}, Body: ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
