import type { ICommandHandler } from '@nestjs/cqrs'

import { ReadAdminDataService } from '@codelab/backend/application/data'
import { AtomRepository } from '@codelab/backend/domain/atom'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeDomainService,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { type IAtomDto } from '@codelab/shared/abstract/core'
import { atomTypes } from '@codelab/shared/data/test'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportCypressAtomsCommand {}

/**
 * This is a subset of atoms to make importing faster
 */
@CommandHandler(ImportCypressAtomsCommand)
export class ImportCypressAtomsHandler
  implements ICommandHandler<ImportCypressAtomsCommand>
{
  constructor(
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly logger: PinoLoggerService,
    private readonly atomRepository: AtomRepository,
    private readonly typeDomainService: TypeDomainService,
  ) {}

  /**
   * Default `atom` for `Element.renderType` may already exist, so we save by name
   */
  async execute() {
    const atomsData = this.readAdminDataService.atoms.filter(({ atom }) =>
      atomTypes.includes(atom.type),
    )

    this.logger.log('Import cypress atoms', {
      context: 'ImportCypressAtomsHandler',
      data: {
        atomCount: atomsData.length,
      },
    })

    const atoms = atomsData.map(({ atom }) => atom)
    const apis = atomsData.map(({ api }) => api)

    await this.typeDomainService.addManyApis(apis)

    /**
     * Then add atoms
     */
    this.logger.log(`Importing all atoms at once, (${atoms.length})`)

    await this.atomRepository.addMany(atoms)
  }
}
