import type { IApiImport } from '@codelab/shared/abstract/core'

import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportApiCommand {
  constructor(public api: IApiImport) {}
}

@CommandHandler(ImportApiCommand)
export class ImportApiHandler
  implements ICommandHandler<ImportApiCommand, void>
{
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async execute(command: ImportApiCommand) {
    const {
      api: { fields, types },
    } = command

    for (const type of types) {
      console.log(`Importing type ${type.name}`)
      await this.typeFactory.save(type)
      console.log('Type saved')
    }

    for (const field of fields) {
      console.log(`Importing field ${field.name}`)
      await this.fieldRepository.save(field)
    }
  }
}
