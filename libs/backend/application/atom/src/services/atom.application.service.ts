import type { IAtomAggregate, IAtomType } from '@codelab/shared-abstract-core'

import { ReadAdminDataService } from '@codelab/backend-application-data'
import { TypeApplicationService } from '@codelab/backend-application-type'
import { AtomRepository } from '@codelab/backend-domain-atom'
import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { LogClassMethod } from '@codelab/backend-infra-core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { omit } from 'remeda'

import { ExportAtomsCommand } from '../use-case'

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

    return this.saveAtoms(atomsData)
  }

  @LogClassMethod()
  async exportAtomsForAdmin(): Promise<Array<IAtomAggregate>> {
    /**
     * Use batch export command to fetch all atoms in one operation
     */
    return await this.commandBus.execute(new ExportAtomsCommand())
  }

  @LogClassMethod()
  async saveAtoms(atoms: Array<IAtomAggregate>) {
    this.logger.log('Saving atoms', {
      atomCount: atoms.length,
    })

    const owner = this.authDomainService.currentUser

    // Process all atoms in parallel, but keep API and atom saves atomic per atom
    // This ensures fields maintain their order within each API
    const atomSavePromises = atoms.map(async ({ api, atom }) => {
      // Save API first (includes types and fields in correct order)
      await this.typeApplicationService.saveApi(api)

      /**
       * Create atom but omit `suggestedChildren`, and `requiredParents` since it requires all atoms to be added first
       */
      const atomWithoutDependencies = omit(atom, [
        'suggestedChildren',
        'requiredParents',
      ])

      // Then save the atom
      await this.atomRepository.save({
        ...atomWithoutDependencies,
        owner,
      })
    })

    // Wait for all atom+API pairs to be saved
    // The HTTP requests will still be batched by BatchHttpLink
    await Promise.all(atomSavePromises)

    const atomsWithDependencies = atoms.filter(
      ({ atom }) =>
        atom.suggestedChildren?.length || atom.requiredParents?.length,
    )

    // Then process atoms with dependencies in parallel
    // These updates will also be batched by BatchHttpLink
    await Promise.all(
      atomsWithDependencies.map(async ({ atom }) => {
        /**
         * Here we assign suggestedChildren and requiredParents, since all atoms must be created first
         */
        await this.atomRepository.update({ ...atom, owner }, { id: atom.id })
      }),
    )
  }
}
