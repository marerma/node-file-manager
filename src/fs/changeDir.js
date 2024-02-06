import { chdir } from 'node:process';
import os from 'node:os';
import { ERROR_MSG } from '../constants.js';
import { LoggerService } from '../Logger.service.js';
import { cleanPath } from '../utils.js';


export const changeDir = (input) => {
  const path = input.split(' ').slice(1);
  const clearPath = path.length > 1 ? cleanPath(path.join(' ')) : cleanPath(path.join(''));
  try {
    chdir(clearPath);
    LoggerService.logCurrentDir()
  } catch (err) {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
}


export const goToHomeDir = () => {
  const homeDir = os.homedir();
  try {
    chdir(homeDir);
    LoggerService.logCurrentDir()
  } catch (err) {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
}