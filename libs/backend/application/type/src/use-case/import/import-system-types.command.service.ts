import { TypeFactory } from '@codelab/backend/domain/type'
import type { IAuth0User, ITypeDTO } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportSystemTypesCommand {
  constructor(public types: Array<ITypeDTO>, public owner: IAuth0User) {}
}

@CommandHandler(ImportSystemTypesCommand)
export class ImportSystemTypesHandler
  implements ICommandHandler<ImportSystemTypesCommand>
{
  constructor(private readonly typeFactory: TypeFactory) {}

  async execute(command: ImportSystemTypesCommand) {
    const { owner, types } = command

    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }
  }
}
