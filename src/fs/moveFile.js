import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';
import { cleanPath } from '../utils.js';

export const moveFile = async(input) => {
  LoggerService.logCurrentDir();

  const args = input.split(' ').slice(1);
  const fileSourcePath = cleanPath(args[0]);
  const fileName = path.basename(fileSourcePath);
  const fileTargetPath = path.join(cleanPath(args[1]), fileName);

  try {
    console.log(fileSourcePath, fileTargetPath);
    const readStream = fs.createReadStream(fileSourcePath);
    readStream.on('error', (err)=> console.log(err))
    const writeStream = fs.createWriteStream(fileTargetPath);
    writeStream.on('error', (err)=> console.log(err))

    await readStream.pipe(writeStream).on('error', (err)=> console.log(err));
    // await fs.rm(fileSourcePath)
  } catch {
    // LoggerService.logMsg(ERROR_MSG.fail)
  }
}