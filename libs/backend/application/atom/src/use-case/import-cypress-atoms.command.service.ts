import type { ICommandHandler } from '@nestjs/cqrs'

import { ReadAdminDataService } from '@codelab/backend/application/data'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
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
  implements ICommandHandler<ImportCypressAtomsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly logger: PinoLoggerService,
  ) {}

  /**
   * Default `atom` for `Element.renderType` may already exist, so we save by name
   */
  async execute() {
    const atoms = this.readAdminDataService.atoms.filter(({ atom }) =>
      atomTypes.includes(atom.type),
    )

    this.logger.log('Import cypress atoms', {
      context: 'ImportCypressAtomsHandler',
      data: {
        atomCount: atoms.length,
      },
    })

    for (const [index, atom] of atoms.entries()) {
      this.logger.log('Importing atom', {
        context: 'ImportCypressAtomsHandler',
        data: {
          atomName: atom.atom.name,
          progress: `${index + 1}/${atoms.length}`,
        },
      })

      await this.commandBus.execute<ImportAtomCommand, IAtomDto>(
        new ImportAtomCommand(atom),
      )
    }
  }
}
