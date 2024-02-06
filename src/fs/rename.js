import { rename } from 'node:fs/promises';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { cleanPath } from '../utils.js';


export const renameFile = async (input) => {
  const args = input.split(' ').slice(1);
  const filePath = cleanPath(args[0]);
  const newName = cleanPath(args[1]);

  LoggerService.logCurrentDir();
  try {
    await rename(filePath, newName);
  } catch {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
};
