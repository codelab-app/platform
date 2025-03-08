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

  async execute({ atomImport }: ImportAtomCommand) {
    const { api, atom } = atomImport

    const importApi = async () => {
      await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))
    }

    const saveAtom = async () => {
      await this.atomRepository.save(atom)
    }

    await this.logger.debugWithTiming('Import Api', importApi, {
      context: 'ImportAtomHandler',
    })

    await this.logger.debugWithTiming('Save Atom', saveAtom, {
      context: 'ImportAtomHandler',
      data: {
        atomName: atom.name,
      },
    })
  }
}
