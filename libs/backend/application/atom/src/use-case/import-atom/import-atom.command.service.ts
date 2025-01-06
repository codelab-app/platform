import type { IAtomImport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ImportApiCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportAtomCommand {
  constructor(public atomImport: IAtomImport) {}
}

@CommandHandler(ImportAtomCommand)
export class ImportAtomHandler
  implements ICommandHandler<ImportAtomCommand, void>
{
  constructor(
    private readonly atomRepository: AtomRepository,
    private commandBus: CommandBus,
    private readonly logger: PinoLoggerService,
  ) {}

  async execute(command: ImportAtomCommand) {
    const {
      atomImport: { api, atom },
    } = command

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))

    await this.atomRepository.save(atom)
  }
}
