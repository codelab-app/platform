import { generateOgmTypes } from '@codelab/backend/adapter/neo4j'
import { spawn } from 'child_process'
import execa from 'execa'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gitChangedFiles from 'git-changed-files'
import isPortReachable from 'is-port-reachable'
import path from 'path'
import { Env } from './env'
import { Tasks } from './tasks'

const NX_TEST = 'npx env-cmd -f .env.test nx'

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

export const runTasks = async (env: string, task: string, args?: string) => {
  console.log('run tasks', env)

  switch (task) {
    case Tasks.Build:
      if (env === Env.Test) {
        // Added since many times can't find production build of next during push
        // Maybe related? https://github.com/nrwl/nx/issues/2839
        // execCommand(`${NX_TEST} build builder -c test`)
        execCommand(`${NX_TEST} affected:build -c test`)
      }

      if (env === Env.CI) {
        execCommand('npx nx affected:build -c ci --verbose')
      }

      break

    case Tasks.Lint:
      if (env === Env.Test) {
        execCommand(`yarn cross-env TIMING=1 lint-staged --verbose`)
        execCommand(`npx ls-lint`)
      }

      if (env === Env.CI) {
        execCommand(`npx nx affected:lint`)
        execCommand(`npx prettier --check ./**/*.{graphql,yaml,json}`)
        execCommand(`npx ls-lint`)
      }

      break

    case Tasks.Unit:
      if (env === Env.Test) {
        execCommand(
          `${NX_TEST} affected:test --testPathPattern="[^i].spec.ts" --memoryLimit=8192 --color --parallel=3`,
        )
      }

      if (env === Env.CI) {
        execCommand(
          `npx nx affected:test --testPathPattern="[^i].spec.ts" --verbose --color --parallel=3`,
        )
      }

      break

    case Tasks.Int:
      if (env === Env.Test) {
        const startServer = `${NX_TEST} serve-test builder -c test`
        const runSpecs = `npx wait-on 'http://127.0.0.1:3001' && ${NX_TEST} test builder -c test`

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
          // if (runSpecsChildProcess.pid) {
          //   process.kill(-runSpecsChildProcess.pid)
          // }
        })
      }

      if (env === Env.CI) {
        const startServer = `nx serve-test builder -c ci`
        const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && nx test builder -c ci --verbose`

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

        runSpecsChildProcess.on('exit', async (code: number) => {
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

    case Tasks.Codegen:
      if (env === Env.Dev) {
        if (!(await isPortReachable(3000, { host: '127.0.0.1' }))) {
          console.error('Please start server!')
          process.exit(0)
        }

        execCommand('yarn graphql-codegen')
        await generateOgmTypes()

        process.exit(0)
      }

      if (env === Env.CI) {
        const startServer = `nx serve-test builder -c ci`
        const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && yarn graphql-codegen && exit 0`

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

        runSpecsChildProcess.on('exit', async (code: number) => {
          if (startServerChildProcess.pid) {
            await generateOgmTypes()

            try {
              process.kill(-startServerChildProcess.pid, 'SIGINT')
            } catch (e) {
              console.error(e)
            }
          }

          const { unCommittedFiles } = await gitChangedFiles()

          console.log('Un-committed files', unCommittedFiles)

          const containsGeneratedFiles = unCommittedFiles.reduce(
            (_matches: boolean, file: string) => {
              const filename = path.basename(file)

              return (
                _matches ||
                filename.includes('.gen.ts') ||
                filename === 'schema.api.graphql'
              )
            },
            false,
          )

          if (containsGeneratedFiles) {
            console.error('Please run codegen!')
            process.exit(1)
          }
        })
      }

      break

    /**
     * When building next web, we must use env to create the production port, otherwise the ports will be different
     *
     * `configuration` not passed when using affected, use `c`
     */
    case Tasks.E2e:
      if (env === Env.Test) {
        execCommand(`${NX_TEST} run builder-e2e:e2e:test --verbose`)
      }

      if (env === Env.CI) {
        execCommand(`npx nx run builder-e2e:e2e:ci --verbose`)
      }

      break

    case Tasks.Commitlint:
      if (env === Env.Test) {
        execCommand(`npx --no-install commitlint --edit ${args}`)
      }

      break

    case Tasks.Circularlint:
      execCommand(`yarn madge --circular apps libs --extensions ts,tsx,js,jsx`)

      break

    default:
      throw new Error('Incorrect test env')
  }

  console.log('Run tasks done!')
}
