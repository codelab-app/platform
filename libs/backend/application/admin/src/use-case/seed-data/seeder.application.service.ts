import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ReadAdminDataService } from '@codelab/backend/application/shared'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
import { IAtomType } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Injectable()
export class SeederApplicationService {
  constructor(
    private readonly commandBus: CommandBus,
    private seederDomainService: SeederDomainService,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly adminRepository: AdminRepository,
  ) {}

  /**
   * Need a function to seed the basic data required for creating some atom/component/types.
   *
   * Ran into issue of needing some data for integration test with a task involving custom resolvers for loading dependent types for some element.
   *
   * There are other seeder functions in this class, but we could have multiple for different reasons
   */
  async seedDataForElementDependentTypesResolver() {
    await this.seederDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    const atoms = this.readAdminDataService.atoms.filter(
      ({ atom }) => atom.type === IAtomType.AntDesignButton,
    )

    for (const atom of atoms) {
      await this.commandBus.execute<ImportAtomCommand>(
        new ImportAtomCommand(atom),
      )
    }
  }

  /**
   * The minimum required data
   */
  async seedDevBootstrapData() {
    await this.seederDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    const atoms = this.readAdminDataService.atoms.filter(
      ({ atom }) => atom.type === IAtomType.ReactFragment,
    )

    for (const atom of atoms) {
      await this.commandBus.execute<ImportAtomCommand>(
        new ImportAtomCommand(atom),
      )
    }
  }

  async seedE2eBootstrapData() {
    await this.adminRepository.resetDatabaseExceptUserAndAtom()

    await this.seederDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    const atoms = this.readAdminDataService.atoms.filter(
      ({ atom }) => atom.type === IAtomType.ReactFragment,
    )

    for (const atom of atoms) {
      await this.commandBus.execute<ImportAtomCommand>(
        new ImportAtomCommand(atom),
      )
    }
  }
}
