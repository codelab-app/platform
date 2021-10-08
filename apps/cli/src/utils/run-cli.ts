import * as shell from 'shelljs'
import { Env } from './env'

const CMD_APP_DIST_PATH = 'dist/apps/cmd'

// `test` is used for pre-push checks. Only `test` uses different port because a dev server may be running, `ci` & `dev` both use normal port.
export const runCli = (env?: Env, cmd = '') => {
  console.log(env, cmd)

  switch (env) {
    case Env.Dev:
      runDevCli(cmd)
      break
    case Env.Test:
      runTestCli(cmd)
      break
    case Env.Ci:
      runCiCli(cmd)
      break
  }
}

const runTestCli = (cmd: string) => {
  if (
    shell.exec(
      `npx env-cmd -f .env.test node ${CMD_APP_DIST_PATH}/main.js ${cmd}`,
    ).code !== 0
  ) {
    shell.exit(1)
  }
}

const runDevCli = (cmd: string) => {
  if (
    shell.exec(`npx env-cmd -f .env node ${CMD_APP_DIST_PATH}/main.js ${cmd}`)
      .code !== 0
  ) {
    shell.exit(1)
  }
}

const runCiCli = (cmd: string) => {
  if (shell.exec(`node ${CMD_APP_DIST_PATH}/main.js ${cmd}`).code !== 0) {
    shell.exit(1)
  }
}
