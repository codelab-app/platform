import { ImportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import type { IAtomAggregate } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportAtomCommand {
  constructor(public atomAggregate: IAtomAggregate) {}
}

@CommandHandler(ImportAtomCommand)
export class ImportAtomHandler
  implements ICommandHandler<ImportAtomCommand, void>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ImportAtomCommand) {
    const {
      atomAggregate: { api, atom },
    } = command

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))

    await this.atomRepository.save(atom)
  }
}
