import type { IApi } from '@codelab/shared/abstract/core'

import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportApiCommand {
  constructor(public api: IApi) {}
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
      await this.typeFactory.save(type)
    }

    for (const field of fields) {
      await this.fieldRepository.save(field)
    }
  }
}
