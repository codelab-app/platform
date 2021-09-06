import {
  GraphqlServerConfig,
  graphqlServerConfig,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { Command } from 'nestjs-console'

@Injectable()
export class ServerService {
  constructor(
    @Inject(graphqlServerConfig.KEY)
    private readonly _graphqlServerConfig: GraphqlServerConfig,
  ) {}

  /**
   * Port is controlled by env vars, so we don't need env in nrwl command like web server
   */
  private START_API_SERVER_COMMAND = 'node dist/apps/api/main.js'

  @Command({ command: 'start' })
  public start() {
    console.log('start')
  }
}
