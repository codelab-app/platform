import {
  execCommand,
  globalHandler,
} from '@codelab/backend/infra/adapter/shell'
import { Stage } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { LazyModuleLoader } from '@nestjs/core'
import { spawn } from 'child_process'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gitChangedFiles from 'git-changed-files'
import isPortReachable from 'is-port-reachable'
import path from 'path'
import type { Argv, CommandModule } from 'yargs'
import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'
import { Tasks } from '../../shared/utils/tasks'

/**
 * We require this since execCommand creates a new process and any env set before that doesn't apply
 */

const NX_TEST = 'npx env-cmd -f .env.test nx'

@Injectable()
export class TaskService implements CommandModule<unknown, unknown> {
  command = 'tasks'

  describe = 'Run tasks'

  constructor(
    // private ogmService: OgmService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return yargv
      .options(getStageOptions([Stage.Dev, Stage.Test, Stage.CI]))
      .middleware([loadStageMiddleware])
      .command(
        Tasks.Build,
        'Build projects',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            execCommand(
              'nx run-many --target=build --projects=platform,platform-api,platform-e2e -c test',
            )
          }

          if (stage === Stage.CI) {
            execCommand('nx build platform -c ci')
          }
        }),
      )
      .command(
        Tasks.Unit,
        'Run unit tests',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            // execCommand(`nx build platform -c test`)
            execCommand('nx affected --target=test:unit -c test')
          }

          if (stage === Stage.CI) {
            execCommand('npx nx affected --target=test:unit --ci -c ci')
          }
        }),
      )
      .command(
        Tasks.Int,
        'Run integration tests',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            execCommand(
              'nx affected --target=test:integration -c test --parallel=1',
            )
          }

          if (stage === Stage.CI) {
            execCommand(
              'npx nx affected --target=test:integration --runInBand --ci -c ci --parallel=1',
            )
          }
        }),
      )
      .command(
        Tasks.Codegen,
        'Run codegen',
        (argv) => argv,
        globalHandler(async ({ stage }) => {
          const { OgmModule } = await import(
            '@codelab/backend/infra/adapter/neo4j'
          )

          const ogmModuleRef = await this.lazyModuleLoader.load(() => OgmModule)

          const { OgmService } = await import(
            '@codelab/backend/infra/adapter/neo4j'
          )

          const ogmService = ogmModuleRef.get(OgmService)

          if (stage === Stage.Dev) {
            if (!(await isPortReachable(4000, { host: '127.0.0.1' }))) {
              console.error('Please start server!')
              process.exit(0)
            }

            execCommand(
              'yarn graphql-codegen --config ./scripts/codegen/codegen.ts',
            )
            await ogmService.generate()

            process.exit(0)
          }

          if (stage === Stage.CI) {
            const startServer = 'nx serve platform-api -c ci'

            const runSpecs =
              "npx wait-on 'tcp:127.0.0.1:4000' && yarn graphql-codegen --config ./scripts/codegen/codegen.ts && exit 0"

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
                  reject(
                    new Error('startServerChildProcess.pid is not defined'),
                  )

                  return
                }

                try {
                  await ogmService.generate()
                  process.kill(-startServerChildProcess.pid, 'SIGINT')

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

                  resolve()
                } catch (error) {
                  console.error(error)
                  reject(error)
                }
              })

              runSpecsChildProcess.on('error', (error) => {
                reject(error)
              })
            })
          }
        }),
      )
      .command(
        Tasks.Lint,
        'Lint projects',
        (argv) => argv,
        globalHandler(({ stage }) => {
          if (stage === Stage.Test) {
            execCommand('yarn cross-env TIMING=1 lint-staged')
            execCommand('npx ls-lint')
          }

          if (stage === Stage.CI) {
            execCommand(
              'npx nx affected --target=lint --parallel=3 --verbose -c ci',
            )
            execCommand('echo $PWD')

            // https://github.com/nrwl/nx/discussions/8769
            execCommand('npx prettier --check "./**/*.{graphql,yaml,json}"')
            // execCommand(
            //   `yarn madge --circular apps libs --extensions ts,tsx,js,jsx`,
            // )
            execCommand('npx ls-lint')
          }
        }),
      )
      .command(
        `${Tasks.Commitlint} [edit]`,
        'Commitlint projects',
        (argv) => argv,
        globalHandler(({ edit, stage }) => {
          if (stage === Stage.Test) {
            execCommand(`npx --no-install commitlint --edit ${edit}`)
          }

          if (stage === Stage.CI) {
            execCommand('./scripts/lint/commitlint-ci.sh')
          }
        }),
      )
      .demandCommand(1, 'Please provide a task')
  }

  handler() {
    //
  }
}
