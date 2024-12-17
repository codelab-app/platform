import type { ICommandHandler } from '@nestjs/cqrs'

import { ReadAdminDataService } from '@codelab/backend/application/data'
import { type IAtomDto } from '@codelab/shared/abstract/core'
import { atomTypes } from '@codelab/shared/data/test'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

import { ImportAtomCommand } from './import-atom'

export class ImportCypressAtomsCommand {}

/**
 * This is a subset of atoms to make importing faster
 */
@CommandHandler(ImportCypressAtomsCommand)
export class ImportCypressAtomsHandler
  implements ICommandHandler<ImportCypressAtomsCommand, Array<IAtomDto>>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  /**
   * Default `atom` for `Element.renderType` may already exist, so we save by name
   */
  async execute() {
    const atoms = this.readAdminDataService.atoms.filter(({ atom }) =>
      atomTypes.includes(atom.type),
    )

    const atomDtos = []

    console.log(`Import cypress atoms, ${atoms.length} atoms`)

    for (const [index, atom] of atoms.entries()) {
      console.log(
        `Importing atom ${atom.atom.name} (${index + 1}/${atoms.length})`,
      )

      const atomDto = await this.commandBus.execute<
        ImportAtomCommand,
        IAtomDto
      >(new ImportAtomCommand(atom))

      atomDtos.push(atomDto)
    }

    return atomDtos
  }
}
