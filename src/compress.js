import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { LoggerService } from "./Logger.service.js";
import { ERROR_MSG } from "./constants.js";
import { cleanPath } from './utils.js';


export const compress = async (input, compressionType) => {
  LoggerService.logCurrentDir();

  const args = input.split(' ').slice(1);
  const fileSourcePath = cleanPath(args[0]);
  const {name, ext} = path.parse(fileSourcePath);
  
  
  try {
    if (compressionType === 'decompress' && ext !== '.br') throw new Error();
    if (compressionType === 'compress' && ext === '.br') throw new Error();
    const brotliStream = compressionType === 'compress' ? createBrotliCompress() : createBrotliDecompress();
    const fileTargetPath = compressionType === 'compress' ? path.join(cleanPath(args[1]), `${name}.br`) : path.join(cleanPath(args[1]), name);
    const source = createReadStream(fileSourcePath);
    const destination = createWriteStream(fileTargetPath);

    source.on('error', () => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });

    destination.on('error', () => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });
    brotliStream.on('error', () => {
      LoggerService.logMsg(ERROR_MSG.fail);
    });

   source.pipe(brotliStream).pipe(destination);
  } catch {
    LoggerService.logMsg(ERROR_MSG.fail);
  }
};