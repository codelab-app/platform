import { AdminService } from '@codelab/backend/domain/admin'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { Injectable } from '@nestjs/common'
import type { Argv, CommandModule } from 'yargs'
import { globalHandler } from '../../shared/handler'
import { loadStageMiddleware } from '../../shared/middleware'
import { getStageOptions } from '../../shared/options'
import { Stage } from '../../shared/utils/stage'

@Injectable()
export class ResetService implements CommandModule<unknown, unknown> {
  command = 'reset'

  describe = 'Reset database'

  builder(argv: Argv<unknown>) {
    return argv
      .options({
        ...getStageOptions([
          Stage.Dev,
          Stage.Test,
          // Stage.Prod
        ]),
      })
      .middleware([loadStageMiddleware])
  }

  handler = globalHandler(async () => {
    return await new AdminService(getDriver()).reset({ close: true })
  })
}
