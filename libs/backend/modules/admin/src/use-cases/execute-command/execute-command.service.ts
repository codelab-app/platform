import { UseCasePort } from '@codelab/backend/abstract/core'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import shell from 'shelljs'
import { ExecuteCommandInput } from './execute-command.input'

@Injectable()
export class ExecuteCommandService
  implements UseCasePort<ExecuteCommandInput, void>
{
  constructor(
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  execute(input: ExecuteCommandInput): Promise<void> {
    const results = shell.exec(input.command)

    if (results.code !== 0) {
      this.logger.error(results.stderr, 'Execute Command')
      // throw new Error('Execute command failed')
    }

    this.logger.log(results.stdout, 'Execute Command')

    return Promise.resolve()
  }
}
