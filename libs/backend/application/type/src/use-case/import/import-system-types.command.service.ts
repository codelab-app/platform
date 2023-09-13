import { TypeFactory } from '@codelab/backend/domain/type'
import type { ITypeDTO } from '@codelab/shared/abstract/core'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportSystemTypesCommand {
  constructor(public types: Array<ITypeDTO>) {}
}

@CommandHandler(ImportSystemTypesCommand)
export class ImportSystemTypesHandler
  implements ICommandHandler<ImportSystemTypesCommand>
{
  constructor(private readonly typeFactory: TypeFactory) {}

  @Span()
  async execute({ types }: ImportSystemTypesCommand) {
    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save(type)
    }
  }
}
