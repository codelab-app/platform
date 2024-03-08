import { ReadAdminDataService } from '@codelab/backend/application/data'
import { TypeFactory } from '@codelab/backend/domain/type'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportSystemTypesCommand {}

@CommandHandler(ImportSystemTypesCommand)
export class ImportSystemTypesHandler
  implements ICommandHandler<ImportSystemTypesCommand>
{
  constructor(
    private readonly typeFactory: TypeFactory,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  async execute() {
    const types = this.readAdminDataService.systemTypes

    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save(type)
    }
  }
}
