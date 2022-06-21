/* eslint-disable no-case-declarations */
import { spawn } from 'child_process'
import concurrently from 'concurrently'
import execa from 'execa'
import fs from 'fs'
import fse from 'fs-extra'
import glob from 'glob'
import path from 'path'
import { sync as rm } from 'rimraf'
import { combineLatest, forkJoin, zip } from 'rxjs'
import * as util from 'util'
import { TaskEnv } from './env'
import { Tasks } from './tasks'

const NX_TEST = 'npx env-cmd -f .env.test nx'
//

/**
 * spawn vs exec - spawn returns a stream while exec returns the whole buffer
 *
 * spawn vs fork - fork shares same parent process
 */

export const execCommand = (command: string) => {
  try {
    execa.commandSync(command, {
      stdio: 'inherit',
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export const runTasks = (env: TaskEnv, task: string, args?: string) => {
  switch (task) {
    // POC to serve only the api page, could be useful later, and improve start server time to some margin
    // case Tasks.ServeApi:
    //   const startServer = `nx _serve web -c api`
    //   const tempApiDir = path.resolve(process.cwd(), 'tmp/api')
    //   const apiDir = path.resolve(process.cwd(), 'apps/web/pages/api')
    //   rm(tempApiDir)
    //   fse.copySync(apiDir, tempApiDir, { recursive: true, overwrite: true })
    //   execCommand(startServer)
    //   break
    case Tasks.Build:
      if (env === TaskEnv.Test) {
        // Added since many times can't find production build of next during push
        // Maybe related? https://github.com/nrwl/nx/issues/2839
        execCommand(`${NX_TEST} build web -c test`)
        execCommand(
          `${NX_TEST} affected:build -c test --exclude=tools-plugins-codelab`,
        )
      }

      if (env === TaskEnv.Ci) {
        const startServer = `nx serve web -c ci --verbose`
        // need try 2 times here (-n 2), time 1 will fail because https://github.com/vercel/next.js/issues/15880, but 2 will success
        const buildWeb = `npx wait-on tcp:3000 && npx retry -n 2 nx run web:build:ci`

        const buildLib =
          'npx nx affected:build -c ci --verbose --exclude=web,/cli'

        const { commands, result } = concurrently(
          [
            { command: startServer, name: 'Start Dev Server' },
            { command: buildWeb, name: 'Build Web' },
            { command: "echo 'a'", name: 'Build lib' },
          ],
          {
            killOthers: ['failure'],
            prefixColors: ['yellow', 'green'],
            pauseInputStreamOnFinish: false,
          },
        )

        result.catch((e) => {
          // process error should be logged in std channel
        })

        combineLatest([commands[1].close, commands[2].close]).subscribe(
          (events) => {
            const failEvent = events.find((e) => e.exitCode !== 0)

            if (failEvent) {
              console.error(
                `Command ${failEvent.command.command} exited with status code ${failEvent.exitCode} `,
              )
              process.exit(1)
            }

            console.log(
              'Complete building. Sending SIGNTERM to [Start Dev Server]',
            )

            if (commands[0]?.process?.stdout) {
              commands[0].process.stdout = null
            }

            commands[0].kill()
            // if don't exit here, process 1 will log error which is annoying because we intentionally send SIGNTERM to it
            process.exit(0)
          },
        )
      }

      break

    case Tasks.Lint:
      if (env === TaskEnv.Test) {
        execCommand(`yarn cross-env TIMING=1 lint-staged --verbose`)
        execCommand(`npx ls-lint`)
      }

      if (env === TaskEnv.Ci) {
        execCommand(`npx nx affected:lint`)
        execCommand(`npx prettier --check ./**/*.{graphql,yaml,json}`)
        execCommand(`npx ls-lint`)
      }

      break

    case Tasks.Unit:
      if (env === TaskEnv.Test) {
        execCommand(
          `${NX_TEST} affected:test --testPathPattern="[^i].spec.ts" --memoryLimit=8192 --color --parallel=3`,
        )
      }

      if (env === TaskEnv.Ci) {
        execCommand(
          `npx nx affected:test --testPathPattern="[^i].spec.ts" --verbose --color --parallel=3`,
        )
      }

      break

    case Tasks.Int:
      if (env === TaskEnv.Test) {
        const startServer = `${NX_TEST} serve-test web -c test`
        const runSpecs = `npx wait-on 'http://127.0.0.1:3001' && ${NX_TEST} test web -c test`

        const runSpecsChildProcess = spawn(runSpecs, {
          stdio: 'inherit',
          // Need shell to access yarn/npx etc
          shell: true,
          detached: true,
        })

        const startServerChildProcess = spawn(startServer, {
          stdio: 'inherit',
          /**
           * The next.js server will spawn it's own set of child processes, setting detached to true means these sub processes won't be attached to the main process, but rather to a detached group.
           *
           * Issue prior was that shutting down this process didn't kill the sub processes
           */
          shell: true,
          detached: true,
        })

        runSpecsChildProcess.on('exit', (code: number, signal) => {
          // console.log('specs process exit!', code, signal)

          /**
           * SIGINT - requested by user
           * SIGKILL - right away
           *
           * If a child process in Node.js spawn their own child processes, kill() method will not kill the child process’s own child processes.
           */
          if (startServerChildProcess.pid) {
            // Please note - before pid. This converts a pid to a group of pids for process kill() method.
            try {
              process.kill(-startServerChildProcess.pid, 'SIGINT')
            } catch (e) {
              //
            }
          }

          process.exit(code)

          // Child process will exit by itself
          // i (runSpecsChildProcess.pid) {
          //   process.kill(-runSpecsChildProcess.pid)
          // }
        })
      }

      if (env === TaskEnv.Ci) {
        const startServer = `nx serve-test web -c ci`
        const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && nx test web -c ci --verbose`

        const runSpecsChildProcess = spawn(runSpecs, {
          stdio: 'inherit',
          shell: true,
          detached: true,
        })

        const startServerChildProcess = spawn(startServer, {
          stdio: 'inherit',
          shell: true,
          detached: true,
        })

        runSpecsChildProcess.on('exit', (code: number) => {
          if (startServerChildProcess.pid) {
            try {
              process.kill(-startServerChildProcess.pid, 'SIGINT')
            } catch (e) {
              //
            }
          }

          process.exit(code)
        })
      }

      break

    /**
     * When building next web, we must use env to create the production port, otherwise the ports will be different
     *
     * `configuration` not passed when using affected, use `c`
     */
    case Tasks.E2e:
      if (env === TaskEnv.Test) {
        execCommand(`${NX_TEST} run web-e2e:e2e:test --verbose`)
      }

      if (env === TaskEnv.Ci) {
        execCommand(`npx nx run web-e2e:e2e:ci --record`)
      }

      break

    case Tasks.Commitlint:
      if (env === TaskEnv.Test) {
        execCommand(`npx --no-install commitlint --edit ${args}`)
      }

      break

    case Tasks.Circularlint:
      execCommand(`yarn madge --circular apps libs --extensions ts,tsx,js,jsx`)

      break

    default:
      throw new Error('Incorrect test env')
  }
}
