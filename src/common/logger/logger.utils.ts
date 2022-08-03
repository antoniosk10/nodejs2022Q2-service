import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import { MyLogger } from './logger.service';

export const logger = (message, context, type, stack = '') => {
  const dir = join(
    __dirname,
    `../../../logs/${type === 'ERROR' ? 'errors' : ''}`,
  );
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  const newLog =
    type === 'ERROR'
      ? `[${type}][${message}] - ${stack}\n`
      : `[${type}][${context}] - ${message}\n`;
  let filePath = join(
    dir,
    `/log${type === 'ERROR' ? 'Errors' : ''}-${MyLogger.lastLog}.txt`,
  );
  try {
    const { size } = statSync(filePath);

    if (size > +process.env.LOGGER_MAX_SIZE * 1000) {
      MyLogger.lastLog = Date.now();
      filePath = join(
        dir,
        `/log${type === 'ERROR' ? 'Errors' : ''}-${MyLogger.lastLog}.txt`,
      );
    }

    writeFileSync(filePath, newLog, { flag: 'as' });
  } catch {
    writeFileSync(filePath, newLog, { flag: 'as' });
  }
};
