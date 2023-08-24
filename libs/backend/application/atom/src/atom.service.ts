import type { IAtomOutputDto } from '@codelab/backend/abstract/core'
import { CurrentUser } from '@codelab/backend/application/service'
import { IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAtomsCommand } from './use-case'
import { ImportAtomCommand } from './use-case/import-atom.command.service'

@Injectable()
export class AtomService {
  constructor(private commandBus: CommandBus) {}

  async exportAtoms() {
    return this.commandBus.execute<ExportAtomsCommand, Array<IAtomOutputDto>>(
      new ExportAtomsCommand(),
    )
  }

  async importAtoms(
    atoms: Array<IAtomOutputDto>,
    @CurrentUser() user: IAuth0User,
  ) {
    for (const atom of atoms) {
      await this.commandBus.execute<ImportAtomCommand, void>(
        new ImportAtomCommand(atom, user),
      )
    }
  }
}
