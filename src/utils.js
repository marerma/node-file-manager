import { fileURLToPath } from "node:url";
import path from "node:path";

export const parseArguments = () => {
  const argValue = Object.entries(process.argv);
  return argValue
      .slice(2)
      .map(([_, v]) => v.split('='))
      .reduce((acc, el) => {
        const key = el[0].replace('--', '');
        const value = el[1];
        acc[key] =value;
        return acc;
      }, {});
  }

export const getCurrentDir = () => {
  return path.dirname(fileURLToPath(import.meta.url));
}

export const cleanPath = (path) => {
  let normalPath = path;
  if (path.includes('"') || path.includes("'")) {
    normalPath = path.replace(/["']/g, '');
  }
  return normalPath;
}