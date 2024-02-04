
import { chdir } from 'node:process';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';

export const up = () => {
  try {
    chdir('..');
    LoggerService.logCurrentDir()
  } catch (err) {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
}