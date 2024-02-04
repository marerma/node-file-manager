import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { cleanPath } from '../utils.js';

export const copyFile = async(input) => {
  LoggerService.logCurrentDir();

  const args = input.split(' ').slice(1);
  const fileSourcePath = cleanPath(args[0]);
  const fileName = path.basename(fileSourcePath)?? '';
  const fileTargetPath = path.resolve(cleanPath(args[1]), fileName);

  try {
    const readStream = fs.createReadStream(fileSourcePath);

    readStream.on('error', (error) => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });

    const writeStream = fs.createWriteStream(fileTargetPath);

    writeStream.on('error', (error) => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });
    await pipeline(readStream, writeStream);
  } catch {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
}