import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAtomsCommand } from './use-case'
import { ImportAtomsCommand } from './use-case/import-atoms.command.service'

@Injectable()
export class AtomService {
  constructor(private commandBus: CommandBus) {}

  async exportAtoms() {
    return this.commandBus.execute<ExportAtomsCommand, Array<IAtomDTO>>(
      new ExportAtomsCommand(),
    )
  }

  async importAtoms(atoms: Array<IAtomDTO>) {
    return this.commandBus.execute<ImportAtomsCommand, void>(
      new ImportAtomsCommand(atoms),
    )
  }
}
