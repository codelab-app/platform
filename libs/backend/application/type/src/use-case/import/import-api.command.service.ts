import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import type { IAuth0User } from '@codelab/shared/abstract/core'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportApiCommand {
  constructor(public apiOutput: IApiOutputDto, public owner: IAuth0User) {}
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
      apiOutput: { fields, types },
      owner,
    } = command

    for (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }

    for (const field of fields) {
      await this.fieldRepository.save({ ...field })
    }
  }
}
