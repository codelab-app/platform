import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportApiCommand {
  constructor(public apiOutput: IApiOutputDto) {}
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
      apiOutput: { fields, types = [], ...api },
    } = command

    const descendantTypesWithApiType = [...types, { ...api, fields: [] }]

    for (const type of descendantTypesWithApiType) {
      await this.typeFactory.save(type)
    }

    for (const field of fields) {
      await this.fieldRepository.save(field)
    }
  }
}
