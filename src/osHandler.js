import os from 'node:os';
import { ERROR_MSG } from './constants.js';
import { LoggerService } from './Logger.service.js';


const getOsFlag = (input) => {
  const flag = input.split(' ').find(el => el.startsWith('--'))?.trim()?.replace('--', '');
  return flag ?? null;
}

export const getOsUserSystemInfo = () => {

  const getCPUData = () => { 
    const count = os.cpus().length;
    const list = os.cpus().map(item => item.model);
    return `The system has ${count} cpus. The list is: ${list.join('')}`
  }

  return ({
    username: os.userInfo().username,
    EOL: os.EOL,
    homedir: os.homedir(),
    cpus: getCPUData(),
    architecture: os.arch()
  })
}

export const osHandler = (input) => {
  const flag = getOsFlag(input);
  const osData = getOsUserSystemInfo();
 
  if (flag in osData) {
    LoggerService.logMsg(osData[flag])
  } else {
    LoggerService.logMsg(ERROR_MSG.invalid)
  }
}