import type { IAtomType } from '@codelab/shared/abstract/core'

import { ReadAdminDataService } from '@codelab/backend/application/data'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

import { ImportAtomCommand } from './import-atom.command.service'

export class ImportAtomsCommand {
  constructor(
    /**
     * The absence of this parameters mean we want to import all
     */
    public atoms?: Array<IAtomType>,
  ) {}
}

@CommandHandler(ImportAtomsCommand)
export class ImportAtomsHandler
  implements ICommandHandler<ImportAtomsCommand, void>
{
  constructor(
    private readonly readAdminDataService: ReadAdminDataService,
    private commandBus: CommandBus,
    private loggerService: PinoLoggerService,
  ) {}

  async execute(command: ImportAtomsCommand) {
    const { atoms } = command
    const atomsData = this.readAdminDataService.atoms

    const filteredAtoms = atoms
      ? atomsData.filter((atom) => atoms.includes(atom.atom.type))
      : atomsData

    for (const [index, atom] of filteredAtoms.entries()) {
      this.loggerService.log(
        `Importing atom ${atom.atom.name} (${index + 1}/${
          filteredAtoms.length
        })`,
      )
      await this.commandBus.execute(new ImportAtomCommand(atom))
    }
  }
}
