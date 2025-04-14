import type { IAtomAggregate, IAtomType } from '@codelab/shared/abstract/core'

import { ReadAdminDataService } from '@codelab/backend/application/data'
import { TypeApplicationService } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { LogClassMethod } from '@codelab/backend/infra/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { SortDirection } from '@codelab/shared/infra/gqlgen'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { omit } from 'remeda'

import { ExportAtomCommand } from '../use-case'

@Injectable()
export class AtomApplicationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly atomRepository: AtomRepository,
    private logger: PinoLoggerService,
    private typeApplicationService: TypeApplicationService,
    private authDomainService: AuthDomainService,
  ) {}

  @LogClassMethod()
  async addAtoms(atomsData: Array<IAtomAggregate>) {
    const atoms = atomsData.map(({ atom }) => atom)
    const apis = atomsData.map(({ api }) => api)

    this.logger.log('Data', {
      atomCount: atomsData.length,
      typeCount: apis.length,
    })

    await this.typeApplicationService.addApis(apis)

    /**
     * Then add atoms
     */
    this.logger.log(`Importing all atoms at once, (${atoms.length})`)

    return await this.atomRepository.addMany(
      atoms.map((atom) => ({
        ...atom,
        owner: this.authDomainService.currentUser,
      })),
    )
  }

  /**
   * Default to all atoms
   */
  @LogClassMethod()
  async addAtomsFromTypes(atomTypes?: Array<IAtomType>) {
    this.logger.log('Adding atoms from types', { atomTypes })

    const atomsData = atomTypes
      ? this.readAdminDataService.getAtomsByTypes(atomTypes)
      : this.readAdminDataService.atoms

    return this.addAtoms(atomsData)
  }

  @LogClassMethod()
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

  @LogClassMethod()
  async saveAtoms(atoms: Array<IAtomAggregate>) {
    this.logger.log('Saving atoms', {
      atomCount: atoms.length,
    })

    // First, process all atoms without dependencies in parallel
    await Promise.all(
      atoms.map(async ({ api, atom }, index) => {
        await this.logger.debug(`Saving atom (${index + 1}/${atoms.length})`)
        await this.typeApplicationService.saveApi(api)

        /**
         * Create all atoms but omit `suggestedChildren`, and `requiredParents` since it requires all atoms to be added first
         */
        const atomWithoutDependencies = omit(atom, [
          'suggestedChildren',
          'requiredParents',
        ])

        await this.atomRepository.save({
          ...atomWithoutDependencies,
          owner: this.authDomainService.currentUser,
        })
      }),
    )

    const atomsWithDependencies = atoms.filter(
      ({ atom }) =>
        atom.suggestedChildren?.length || atom.requiredParents?.length,
    )

    // Then process atoms with dependencies in parallel as well
    await Promise.all(
      atomsWithDependencies.map(async ({ atom }) => {
        /**
         * Here we assign suggestedChildren and requiredParents, since all atoms must be created first
         */
        await this.atomRepository.save({
          ...atom,
          owner: this.authDomainService.currentUser,
        })
      }),
    )
  }
}
