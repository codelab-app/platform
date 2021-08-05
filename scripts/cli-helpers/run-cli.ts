import { Env } from './env'

const shell = require('shelljs')

// `local` is used for pre-push checks. Only `local` uses different port because a dev server may be running, `ci` & `dev` both use normal port.
export const runCli = (env?: Env, cmd: string = '') => {
  // We want to build the `cli` app first
  // if (!process.env.CI) {
  //   if (shell.exec('npx nx build cli --verbose').code !== 0) {
  //     shell.exit(1)
  //   }
  // }

  switch (env) {
    case Env.Dev:
      runDevCli(cmd)
      break
    case Env.Local:
      runLocalCli(cmd)
      break
    case Env.Ci:
      runCiCli(cmd)
      break
  }
}

const runLocalCli = (cmd: string) => {
  if (
    shell.exec(`npx env-cmd -f .env.test node dist/apps/cli/main.js ${cmd}`)
      .code !== 0
  ) {
    shell.exit(1)
  }
}

const runDevCli = (cmd: string) => {
  if (
    shell.exec(`npx env-cmd -f .env node dist/apps/cli/main.js ${cmd}`).code !==
    0
  ) {
    shell.exit(1)
  }
}

const runCiCli = (cmd: string) => {
  if (shell.exec(`node dist/apps/cli/main.js ${cmd}`).code !== 0) {
    shell.exit(1)
  }
}
