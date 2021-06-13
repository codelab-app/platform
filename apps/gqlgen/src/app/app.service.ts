import { Inject, Injectable } from '@nestjs/common'
import { ConsoleService } from 'nestjs-console'
import { AppServiceProvider, Options } from './app.providers'
import { AppDevTokens } from './dev/config/app-dev.tokens'
import { AppE2eTokens } from './e2e/config/app-e2e.tokens'

@Injectable()
export class AppService {
  constructor(
    private readonly consoleService: ConsoleService,
    @Inject(AppE2eTokens.AppE2eService)
    private readonly appE2eService: AppServiceProvider,
    @Inject(AppDevTokens.AppDevService)
    private readonly appDevService: AppServiceProvider,
  ) {
    const cli = this.consoleService.getCli()

    if (!cli) {
      return
    }

    this.consoleService.createCommand(
      {
        command: 'codegen',
        options: [
          {
            flags: '-e, --e2e',
            required: false,
            defaultValue: false,
          },
          {
            flags: '-w, --watch',
            required: false,
            defaultValue: false,
          },
        ],
        description: 'Run codegen for GraphQL',
      },
      this.codegen.bind(this),
      cli,
    )
  }

  public async codegen({ watch, e2e }: Options) {
    let appService = this.appDevService

    if (e2e) {
      appService = this.appE2eService
    }

    await appService.codegen({ watch })
  }
}
