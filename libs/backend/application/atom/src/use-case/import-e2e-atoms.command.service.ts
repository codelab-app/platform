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
import { type IAtomDto, IAtomType } from '@codelab/shared/abstract/core'
import { ATOM_TYPES } from '@codelab/shared/data/test'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportE2eAtomsCommand {
  constructor(public atomTypes: Array<IAtomType> = ATOM_TYPES) {}
}

/**
 * This is a subset of atoms to make importing faster
 */
@CommandHandler(ImportE2eAtomsCommand)
export class ImportE2eAtomsHandler
  implements ICommandHandler<ImportE2eAtomsCommand>
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
  async execute({ atomTypes }: ImportE2eAtomsCommand) {
    console.log('atomTypes', atomTypes)

    const atomsData = this.readAdminDataService.atoms.filter(({ atom }) =>
      atomTypes.includes(atom.type),
    )

    this.logger.log('Import e2e atoms', {
      atomCount: atomsData.length,
      context: 'ImportE2eAtomsHandler',
    })

    const atoms = atomsData.map(({ atom }) => atom)
    const apis = atomsData.map(({ api }) => api)

    this.logger.log('Importing types', {
      context: 'ImportE2eAtomsHandler',
      typeCount: apis.length,
    })

    await this.typeDomainService.addManyApis(apis)

    /**
     * Then add atoms
     */
    this.logger.log(`Importing all atoms at once, (${atoms.length})`)

    await this.atomRepository.addMany(atoms)
  }
}
