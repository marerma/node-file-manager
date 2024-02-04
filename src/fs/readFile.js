import { createReadStream } from 'node:fs';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { stdout } from 'node:process';

export const readFile = async (input) => {
  LoggerService.logCurrentDir()
  const filePath = input.split(' ').slice(1).join('');

  const rr = createReadStream(filePath);
  rr.on('error', () => {
    LoggerService.logMsg(ERROR_MSG.fail);
  });

  rr.pipe(stdout)
    .on('error', () => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });
}