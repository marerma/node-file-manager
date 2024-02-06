import { writeFile } from 'node:fs/promises';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { join } from "node:path";

export const addFile = async (input) => {
  const currentDir = process.cwd();
  const fileName = input.split(' ').slice(1).join('');
  const filePath = join(currentDir, fileName);
  LoggerService.logCurrentDir();
  try {
    await writeFile(filePath, '');
  } catch {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
};
