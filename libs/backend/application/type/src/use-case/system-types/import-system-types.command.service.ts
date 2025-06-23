import type { ICommandHandler } from '@nestjs/cqrs'

import { ReadAdminDataService } from '@codelab/backend-application-data'
import { TypeDomainService } from '@codelab/backend-domain-type'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportSystemTypesCommand {}

@CommandHandler(ImportSystemTypesCommand)
export class ImportSystemTypesHandler
  implements ICommandHandler<ImportSystemTypesCommand>
{
  constructor(
    private readonly readAdminDataService: ReadAdminDataService,
    protected logger: PinoLoggerService,
    private typeDomainService: TypeDomainService,
  ) {}

  async execute() {
    const types = this.readAdminDataService.systemTypes

    await this.typeDomainService.saveMany(types)
  }
}
