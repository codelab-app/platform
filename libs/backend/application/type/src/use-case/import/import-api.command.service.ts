import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { IApi } from '@codelab/shared/abstract/core'
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

  @Span()
  async execute(command: ImportApiCommand) {
    const {
      api: { fields, types },
    } = command

    const descendantTypesWithApiType = [...types, { ...api, fields: [] }]

    for (const type of descendantTypesWithApiType) {
      await this.typeFactory.save(type, { name: type.name })
    }

    for (const field of fields) {
      await this.fieldRepository.save(field)
    }
  }
}
