import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'

import { execCommand } from '@codelab/backend-infra-adapter-shell'
import { Stage } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import type { StageParam } from '../../shared/options'

import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'

@Injectable()
export class DockerService implements CommandModule<unknown, unknown> {
  command = 'docker'

  describe = 'Docker commands'

  constructor() {
    this.builder = this.builder.bind(this)
  }

  builder(yargv: Argv<unknown>) {
    return yargv
      .options({
        ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
      })
      .middleware([loadStageMiddleware])
      .command<StageParam>(
        'build',
        'docker build',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.CI) {
            execCommand('')

            return
          }
        },
      )
      .demandCommand(1, 'Please provide a task')
  }

  handler(args: ArgumentsCamelCase) {
    //
  }
}
