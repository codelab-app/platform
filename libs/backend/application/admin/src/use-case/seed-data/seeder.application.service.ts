import {
  ImportAtomCommand,
  ImportCypressAtomsCommand,
} from '@codelab/backend/application/atom'
import { ReadAdminDataService } from '@codelab/backend/application/data'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
import { DatabaseService } from '@codelab/backend/infra/adapter/neo4j'
import type { IAtom } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Injectable()
export class SeederApplicationService {
  constructor(
    private readonly commandBus: CommandBus,
    private seederDomainService: SeederDomainService,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly databaseService: DatabaseService,
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
  async setupDevBootstrapData() {
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

  async setupE2eSystemData() {
    await this.databaseService.resetDatabase()

    await this.seederDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await this.commandBus.execute<ImportCypressAtomsCommand, Array<IAtom>>(
      new ImportCypressAtomsCommand(),
    )
  }
}
