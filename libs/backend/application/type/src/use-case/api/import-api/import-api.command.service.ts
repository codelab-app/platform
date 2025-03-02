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

    const apiId = fields[0]?.api.id
    const api = types.find((type) => type.id === apiId)
    const apiExists = api && (await this.typeFactory.findOne(api))

    for (const type of types) {
      await this.typeFactory.save(type)
    }

    for (const field of fields) {
      if (apiExists) {
        await this.fieldRepository.update(field, field)
      } else {
        await this.fieldRepository.add(field)
      }
    }
  }
}
