import type { Argv, CommandModule } from 'yargs'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { $, globalHandler } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'
import { spawn } from 'child_process'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import gitChangedFiles from 'git-changed-files'
import isPortReachable from 'is-port-reachable'
import path from 'path'

import type { StageParam } from '../../shared/options'

import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'
import { Tasks } from '../../shared/utils/tasks'

@Injectable()
export class TaskService implements CommandModule<unknown, unknown> {
  command = 'tasks'

  describe = 'Run tasks'

  constructor(private readonly logger: PinoLoggerService) {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return yargv
      .options(getStageOptions([Stage.Dev, Stage.Test, Stage.CI]))
      .middleware([loadStageMiddleware])
      .command<StageParam>(
        Tasks.Build,
        'Build projects',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            $.sync`nx affected --target=build -c test`
          }

          if (stage === Stage.CI) {
            this.logger.log('Building projects', {
              context: 'TaskService',
              data: { stage },
            })
            // Can't use on CI since no `cli` yet
          }
        }),
      )
      .command<StageParam>(
        Tasks.Unit,
        'Run unit tests',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            // $`nx build web -c test`
            $.sync`nx affected --target=test -c test.unit`
          }

          if (stage === Stage.CI) {
            this.logger.log('Running unit tests', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`pnpm nx affected --target=test -c ci.unit --ci`
          }
        }),
      )
      .command<StageParam>(
        Tasks.Int,
        'Run integration tests',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            this.logger.log('Running integration tests', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`nx affected --target=test -c test.integration --parallel=1`
          }

          if (stage === Stage.CI) {
            this.logger.log('Running integration tests', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`pnpm nx affected --target=test -c ci.integration --runInBand --ci --parallel=1`
          }
        }),
      )
      .command<StageParam>(
        Tasks.GraphqlCodegen,
        'Run codegen',
        (argv) => argv,
        globalHandler(async ({ stage }) => {
          if (stage === Stage.Dev) {
            this.logger.log('Running codegen', {
              context: 'TaskService',
              data: { stage },
            })

            if (!(await isPortReachable(4000, { host: '127.0.0.1' }))) {
              this.logger.error('Server not reachable', {
                context: 'TaskService',
                data: { port: 4000 },
              })
              process.exit(0)
            }

            // Use spawn for streaming output
            const codegenProcess = spawn(
              'pnpm',
              ['graphql-codegen', '--config', './scripts/codegen/codegen.ts'],
              {
                stdio: 'inherit',
                shell: true,
              },
            )

            await new Promise<void>((resolve, reject) => {
              codegenProcess.on('exit', (code) => {
                if (code === 0) {
                  resolve()
                } else {
                  reject(new Error(`Codegen failed with code ${code}`))
                }
              })
              codegenProcess.on('error', reject)
            })

            process.exit(0)
          }

          if (stage === Stage.CI) {
            this.logger.log('Running codegen', {
              context: 'TaskService',
              data: { stage },
            })

            const startServer = 'nx serve api -c ci'

            const runSpecs =
              "pnpm wait-on 'tcp:127.0.0.1:4000' && pnpm graphql-codegen --config ./scripts/codegen/codegen.ts && exit 0"

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

            await new Promise<void>((resolve, reject) => {
              runSpecsChildProcess.on('exit', async (code: number) => {
                if (!startServerChildProcess.pid) {
                  this.logger.error('Server process pid not defined', {
                    context: 'TaskService',
                    data: { pid: startServerChildProcess.pid },
                  })
                  reject(
                    new Error('startServerChildProcess.pid is not defined'),
                  )

                  return
                }

                try {
                  process.kill(-startServerChildProcess.pid, 'SIGINT')

                  const { unCommittedFiles } = await gitChangedFiles()

                  this.logger.log('Checking uncommitted files', {
                    context: 'TaskService',
                    data: { unCommittedFiles },
                  })

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
                    $.sync`git diff`
                    this.logger.error('Generated files not committed', {
                      context: 'TaskService',
                      data: { containsGeneratedFiles },
                    })
                    process.exit(1)
                  }

                  resolve()
                } catch (error) {
                  this.logger.error('Error in codegen process', {
                    context: 'TaskService',
                    data: { error },
                  })
                  reject(error)
                }
              })

              runSpecsChildProcess.on('error', (error) => {
                this.logger.error('Error in specs process', {
                  context: 'TaskService',
                  data: { error },
                })
                reject(error)
              })
            })
          }
        }),
      )
      .command(
        Tasks.WorkspaceCodegen,
        'Generate workspace',
        (argv) => argv,
        globalHandler(async ({ stage }) => {
          if (stage === Stage.CI) {
            this.logger.log('Running Circleci pack', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`pnpm cpack`

            this.logger.log('Generating workspace', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`pnpm nx generate @codelab/tools-workspace:nx-project-config --no-interactive`

            const { unCommittedFiles } = await gitChangedFiles()

            this.logger.log('Checking workspace uncommitted files', {
              context: 'TaskService',
              data: { unCommittedFiles },
            })

            if (unCommittedFiles.length) {
              $.sync`git diff`
              this.logger.error('Workspace changes not committed', {
                context: 'TaskService',
                data: { unCommittedFiles },
              })
              process.exit(1)
            }
          }
        }),
      )
      .command(
        Tasks.Lint,
        'Lint projects',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            this.logger.log('Running lint', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`pnpm cross-env TIMING=1 lint-staged`
          }

          if (stage === Stage.CI) {
            this.logger.log('Running lint', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`pnpm nx affected --target=lint -c ci`

            // Below breaks cache
            // $`pnpm nx affected --target=lint -c ci --rule "unused-imports/no-unused-imports: error"`

            // https://github.com/nrwl/nx/discussions/8769
            $.sync`pnpm prettier --check "./**/*.{graphql,yaml,json}"`
          }

          $.sync`pnpm ls-lint`
        }),
      )
      .command(
        `${Tasks.Commitlint} [edit]`,
        'Commitlint projects',
        (argv) => argv,
        globalHandler(({ edit, stage }) => {
          if (stage === Stage.Test) {
            this.logger.log('Running commitlint', {
              context: 'TaskService',
              data: { edit, stage },
            })
            $.sync`pnpm --no-install commitlint --edit ${edit}`
          }

          if (stage === Stage.CI) {
            this.logger.log('Running commitlint', {
              context: 'TaskService',
              data: { stage },
            })
            $.sync`./scripts/lint/commitlint-ci.sh`
          }
        }),
      )
      .demandCommand(1, 'Please provide a task')
  }

  handler() {
    //
  }
}
