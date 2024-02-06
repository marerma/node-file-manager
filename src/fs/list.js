import { readdir } from 'node:fs/promises';
import { LoggerService } from '../Logger.service.js';
import { ERROR_MSG } from '../constants.js';

export const listContent = async() => {
  const currentDir = process.cwd();
  try {
    const files = await readdir(currentDir, {withFileTypes: true});
    const orderedFiles = files
      .map(file => ({
          Name: file.name,
          Type: file.isDirectory()? 'directory' : 'file'
        }))
      .sort((a, b) => a.Type.localeCompare(b.Type) || (a.Name.toLowerCase()).localeCompare(b.Name.toLowerCase()))
    
      if (!orderedFiles.length) {
      LoggerService.logMsg('The directory is empty')
    } else {
      console.table(orderedFiles);
    }
    LoggerService.logCurrentDir()
   } catch {
    LoggerService.logMsg(ERROR_MSG.fail);
  } 
}