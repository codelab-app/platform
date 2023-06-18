import { generateOgmTypes } from '@codelab/backend/infra/adapter/neo4j'
import { execCommand } from '@codelab/backend/infra/adapter/shell'
import { Injectable } from '@nestjs/common'
import { spawn } from 'child_process'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gitChangedFiles from 'git-changed-files'
import isPortReachable from 'is-port-reachable'
import path from 'path'
import type { Argv, CommandModule } from 'yargs'
import { getStageOptions } from '../../shared/options'
import { Stage } from '../../shared/utils/stage'
import { Tasks } from '../../shared/utils/tasks'

/**
 * We require this since execCommand creates a new process and any env set before that doesn't apply
 */
const NX_TEST = 'npx env-cmd -f .env.test nx'

@Injectable()
export class TaskService implements CommandModule<unknown, unknown> {
  command = 'tasks'

  describe = 'Run tasks'

  builder(yargv: Argv<unknown>) {
    return yargv
      .options(getStageOptions([Stage.Dev, Stage.Test, Stage.CI]))
      .command(
        Tasks.Build,
        'Build projects',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            execCommand(`${NX_TEST} build platform -c test`)
          }

          if (stage === Stage.CI) {
            execCommand(`nx build platform -c ci`)
          }
        },
      )
      .command(
        Tasks.Unit,
        'Run unit tests',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            // execCommand(`${NX_TEST} build platform -c test`)
            execCommand(`${NX_TEST} affected --target=test:unit`)
          }

          if (stage === Stage.CI) {
            execCommand('npx nx affected --target=test:unit -c ci')
          }
        },
      )
      .command(
        Tasks.Int,
        'Run integration tests',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.Test) {
            execCommand(`${NX_TEST} affected --target=test:integration`)
          }

          if (stage === Stage.CI) {
            execCommand('npx nx affected --target=test:integration -c ci')
          }
        },
      )
      .command(
        Tasks.Codegen,
        'Run codegen',
        (argv) => argv.fail((msg, err) => console.log(msg, err)),
        async ({ stage }) => {
          if (stage === Stage.Dev) {
            if (!(await isPortReachable(3000, { host: '127.0.0.1' }))) {
              console.error('Please start server!')
              process.exit(0)
            }

            execCommand('yarn graphql-codegen')
            // await graphqlCodegen()
            await generateOgmTypes()

            process.exit(0)
          }

          if (stage === Stage.CI) {
            const startServer = `nx serve-test platform -c ci`
            const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && yarn graphql-codegen && exit 0`

            const runSpecsChildProcess = spawn(runSpecs, {
              detached: true,
              shell: true,
              stdio: 'inherit',
            })

            const startServerChildProcess = spawn(startServer, {
              detached: true,
              shell: true,
              stdio: 'inherit',
            })

            runSpecsChildProcess.on('exit', async (code: number) => {
              if (startServerChildProcess.pid) {
                await generateOgmTypes()

                try {
                  process.kill(-startServerChildProcess.pid, 'SIGINT')
                } catch (error) {
                  console.error(error)
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
                    filename === 'schema.graphql'
                  )
                },
                false,
              )

              if (containsGeneratedFiles) {
                execCommand('git diff')
                console.error('Please run codegen!')
                process.exit(1)
              }
            })
          }
        },
      )
      .command(
        Tasks.E2e,
        'Run e2e tests',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.Test) {
            execCommand(`${NX_TEST} run platform-e2e:e2e:test `)
          }

          if (stage === Stage.Dev) {
            execCommand(`${NX_TEST} run platform-e2e:e2e:dev`)
          }

          if (stage === Stage.CI) {
            // Using `affected` here causes CircleCI parallel specs to not work
            // execCommand(`npx nx affected --target=e2e -c ci`)
            execCommand(`npx nx run platform-e2e:e2e:ci --verbose`)
          }
        },
      )
      .command(
        Tasks.Lint,
        'Lint projects',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.Test) {
            execCommand(`yarn cross-env TIMING=1 lint-staged`)
            execCommand(`npx ls-lint`)
          }

          if (stage === Stage.CI) {
            execCommand(
              `npx nx affected --target=lint --parallel=3 --verbose -c ci`,
            )
            // https://github.com/nrwl/nx/discussions/8769
            execCommand(`npx prettier --check "./**/*.{graphql,yaml,json}"`)
            // execCommand(
            //   `yarn madge --circular apps libs --extensions ts,tsx,js,jsx`,
            // )
            execCommand(`npx ls-lint`)
          }
        },
      )
      .command(
        `${Tasks.Commitlint} [edit]`,
        'Commitlint projects',
        (argv) => argv,
        ({ edit, stage }) => {
          if (stage === Stage.Test) {
            execCommand(`npx --no-install commitlint --edit ${edit}`)
          }

          if (stage === Stage.CI) {
            execCommand(`./scripts/lint/commitlint-ci.sh`)
          }
        },
      )
      .demandCommand(1, 'Please provide a task')
  }

  handler() {
    //
  }
}
