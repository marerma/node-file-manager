import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { cleanPath } from '../utils.js';

export const calculateHash = async (input) => {
  try {
    const args = input.split(' ').slice(1);
    const filePath = cleanPath(args[0]);
    const readStream = createReadStream(filePath);
    readStream.on('error', () => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });

    const hash = createHash('sha256');
    readStream.pipe(hash).on('finish', () => {
      LoggerService.logMsg(`${hash.digest('hex')}`)
    })
  } catch  (error) {
    LoggerService.logMsg(ERROR_MSG.fail);
  }
};
