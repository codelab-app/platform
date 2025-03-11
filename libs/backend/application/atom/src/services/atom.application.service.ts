import type { IAtomAggregate, IAtomType } from '@codelab/shared/abstract/core'

import { ReadAdminDataService } from '@codelab/backend/application/data'
import { TypeApplicationService } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { TypeDomainService } from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { SortDirection } from '@codelab/shared/infra/gqlgen'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { ExportAtomCommand } from '../use-case'

@Injectable()
export class AtomApplicationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly atomRepository: AtomRepository,
    private logger: PinoLoggerService,
    private readonly typeDomainService: TypeDomainService,
    private typeApplicationService: TypeApplicationService,
    private authDomainService: AuthDomainService,
  ) {}

  async exportAtomsForAdmin(): Promise<Array<IAtomAggregate>> {
    /**
     * Get all atoms first
     */
    const atomIds = await this.atomRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      schema: EntitySchema,
      selectionSet: '{ id }',
    })

    const exportedAtoms = []

    for (const { id } of atomIds) {
      exportedAtoms.push(
        await this.commandBus.execute(new ExportAtomCommand({ id })),
      )
    }

    return exportedAtoms
  }

  async importAtoms(atomsData: Array<IAtomAggregate>) {
    this.logger.log('Import atoms', {
      atomCount: atomsData.length,
      context: 'ImportAtomsHandler',
    })

    const atoms = atomsData.map(({ atom }) => atom)
    const apis = atomsData.map(({ api }) => api)

    this.logger.log('Importing types', {
      context: 'ImportAtomsHandler',
      typeCount: apis.length,
    })

    await this.typeApplicationService.addApis(apis)

    /**
     * Then add atoms
     */
    this.logger.log(`Importing all atoms at once, (${atoms.length})`)

    await this.atomRepository.addMany(
      atoms.map((atom) => ({
        ...atom,
        owner: this.authDomainService.currentUser,
      })),
    )
  }

  async importAtomsFromTypes(atomTypes?: Array<IAtomType>) {
    const atomsData = atomTypes
      ? this.readAdminDataService.getAtomsByTypes(atomTypes)
      : this.readAdminDataService.atoms

    return this.importAtoms(atomsData)
  }
}
