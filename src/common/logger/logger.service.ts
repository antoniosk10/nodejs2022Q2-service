import { ConsoleLogger, Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { join } from 'path';
import { LOGGER_LEVELS } from './loggerLevelsMap';

const logger = (message, context, type) => {
  const dir = join(__dirname, '../../../logs/');
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  const newLog = `[${type}][${context}] - ${message}\n`;
  let filePath = join(dir, `/log-${MyLogger.lastLog}.txt`);
  try {
    const { size } = statSync(filePath);

    if (size > +process.env.LOGGER_MAX_SIZE * 1000) {
      MyLogger.lastLog = Date.now();
      filePath = join(dir, `/log-${MyLogger.lastLog}.txt`);
    }

    writeFileSync(filePath, newLog, { flag: 'as' });
  } catch {
    writeFileSync(filePath, newLog, { flag: 'as' });
  }
};

const loggerError = (message, stack, type) => {
  const dir = join(__dirname, '../../../logs/errors');
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  const newLog = `[${type}][${message}] - ${stack}\n`;
  let filePath = join(dir, `/logError-${MyLogger.lastLog}.txt`);
  try {
    const { size } = statSync(filePath);

    if (size > +process.env.LOGGER_MAX_SIZE * 1000) {
      MyLogger.lastLog = Date.now();
      filePath = join(dir, `/logError-${MyLogger.lastLog}.txt`);
    }

    writeFileSync(filePath, newLog, { flag: 'as' });
  } catch {
    writeFileSync(filePath, newLog, { flag: 'as' });
  }
};

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(LOGGER_LEVELS[process.env.LOGGER_LEVEL]);
  }
  static lastLog = Date.now();

  error(message, stack) {
    loggerError(message, stack, 'ERROR');
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
