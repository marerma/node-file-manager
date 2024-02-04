class Logger {
  logCurrentDir () {
    console.log(`You are currently in ${process.cwd()}`)
  };
  logMsg (msg) {
    console.log(msg)
  }
}

export const LoggerService = new Logger();