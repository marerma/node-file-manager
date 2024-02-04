import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { LoggerService } from "./Logger.service.js";
import { ERROR_MSG } from "./constants.js";
import { addFile, changeDir, goToHomeDir, listContent, readFile, calculateHash, up, deleteFile, renameFile, copyFile, moveFile  } from "./fs/index.js";
import { osHandler } from "./osHandler.js";
import { parseArguments } from "./utils.js";
import {compress} from './compress.js'



const userName = parseArguments().username ?? 'Anonym';
goToHomeDir();
LoggerService.logMsg(`Welcome to the File Manager, ${userName}!`)

const rl = readline.createInterface({input, output});


const COMMANDS = {
  up: () => up(),
  cd: (input) => changeDir(input),
  ls: async() => await listContent(), 
  cat: async (input) => await readFile(input),
  add: async (input) => await addFile(input),
  rn: async (input) => await renameFile(input),
  cp: async (input) => await copyFile(input),
  mv: async (input) => await moveFile(input),
  rm: async (input) => await deleteFile(input),
  os: (input) => osHandler(input),
  hash: async (input) => await calculateHash(input),
  compress: async (input) => await compress(input, 'compress'),
  decompress: async (input) => await compress(input, 'decompress'),

  '.exit': () => {
    LoggerService.logMsg(`Thank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
  },
  default: () => LoggerService.logMsg(ERROR_MSG.invalid)
}
export const commandHandler = (command) => {
  const commandToRun = command in COMMANDS ? COMMANDS[command] : COMMANDS['default'];
  return commandToRun;
};


rl.on('line', async (line) => {
  const query = line.trim();
  const command = query.split(' ')[0];
  const action = commandHandler(command);
  await action(query);

})

rl.on('SIGINT', ()=> {
  LoggerService.logMsg(`Thank you for using File Manager, ${userName}, goodbye!`);
  rl.close();
})