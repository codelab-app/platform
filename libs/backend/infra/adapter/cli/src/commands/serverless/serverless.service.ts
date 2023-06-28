import { execCommand } from '@codelab/backend/infra/adapter/shell'
import { Injectable } from '@nestjs/common'
import type { Argv, CommandModule } from 'yargs'
import { getStageOptions } from '../../shared/options'
import { Stage } from '../../shared/utils/stage'

@Injectable()
export class ServerlessService implements CommandModule<unknown, unknown> {
  command = 'serverless'

  describe = 'Serverless operations for deploying to AWS'

  builder(yargv: Argv<unknown>) {
    return yargv
      .options({
        ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
      })
      .command(
        'deploy',
        'Deploy to AWS Lambda',
        (argv) => argv,
        ({ stage }) => {
          if (stage === Stage.Prod) {
            execCommand('nx build cli -c production')
            execCommand('sls deploy -c serverless-cli.yml')
          }
        },
      )
      .command(
        'invoke',
        'Invoke an AWS Lambda',
        (argv) => argv,
        ({ _, stage }) => {
          // Get the ... ['serverless', 'invoke', ...]
          const positionalArgs = _.slice(2)
          console.log(positionalArgs)

          /**
           * Need to convert to json format
           */
          const parsedLambdaData = positionalArgs.join(' ')
          console.log(parsedLambdaData)

          if (stage === Stage.Prod) {
            execCommand(
              `sls invoke -c serverless-cli.yml --function main --raw --data ${parsedLambdaData}`,
            )
          }
        },
      )
      .demandCommand(1)
  }

  handler() {
    //
  }
}
