import type { ICommandHandler } from '@nestjs/cqrs'

import { IImportOptions } from '@codelab/backend/abstract/types'
import { ReadAdminDataService } from '@codelab/backend/application/data'
import { TypeDomainService } from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportSystemTypesCommand {
  constructor(public options?: IImportOptions) {}
}

@CommandHandler(ImportSystemTypesCommand)
export class ImportSystemTypesHandler
  implements ICommandHandler<ImportSystemTypesCommand>
{
  constructor(
    private readonly readAdminDataService: ReadAdminDataService,
    protected logger: PinoLoggerService,
    private typeDomainService: TypeDomainService,
  ) {}

  async execute({ options }: ImportSystemTypesCommand) {
    const types = this.readAdminDataService.systemTypes

    if (options?.upsert) {
      await this.typeDomainService.saveMany(types)
    } else {
      await this.typeDomainService.addMany(types)
    }
  }
}
