import fs from 'fs/promises';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { cleanPath } from '../utils.js';
import { copyFile } from './copyFile.js';

export const moveFile = async(input) => {
  const args = input.split(' ').slice(1);
  const fileSourcePath = cleanPath(args[0]);
  try {
    await copyFile(input);
    await fs.rm(fileSourcePath)
  } catch {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
}