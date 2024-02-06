import { rm } from 'node:fs/promises';
import { LoggerService } from "../Logger.service.js";
import { ERROR_MSG } from "../constants.js";


export const deleteFile = async (input) => {
  const filePath = input.split(' ').slice(1).join('');
  try {
    await rm(filePath);
  } catch {
    LoggerService.logMsg(ERROR_MSG.fail)
  }
};
