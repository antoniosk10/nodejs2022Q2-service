import { ConsoleLogger, Injectable } from '@nestjs/common';
import { logger } from './logger.utils';
import { LOGGER_LEVELS } from './loggerLevelsMap';

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(LOGGER_LEVELS[process.env.LOGGER_LEVEL]);
  }
  static lastLog = Date.now();

  error(message, stack) {
    logger(message, '', 'ERROR', stack);
    super.error(message, stack);
  }
  log(message: any, context) {
    logger(message, context, 'LOG');
    super.log(message, context);
  }
  warn(message: any, context) {
    logger(message, context, 'WARNING');
    super.warn(message, context);
  }
  debug(message: any, context) {
    logger(message, context, 'DEBUG');
    super.debug(message, context);
  }
  verbose(message: any, context) {
    logger(message, context, 'VERBOSE');
    super.verbose(message, context);
  }
}
