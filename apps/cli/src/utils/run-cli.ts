import { Env } from './env'
import { execCommand } from './run-tasks'

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

/**
 * Test loads from `.env.test` locally
 * @param cmd
 */
const runTestCli = (cmd: string) => {
  execCommand(
    `npx env-cmd -f .env.test node ${CMD_APP_DIST_PATH}/main.js ${cmd}`,
  )
}

/**
 * Dev loads from `.env` locally
 */
const runDevCli = (cmd: string) => {
  execCommand(`npx env-cmd -f .env node ${CMD_APP_DIST_PATH}/main.js ${cmd}`)
}

/**
 * CI assumes env are pre-injected
 */
const runCiCli = (cmd: string) => {
  execCommand(`node ${CMD_APP_DIST_PATH}/main.js ${cmd}`)
}
