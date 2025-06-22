import { AtomApplicationService } from '@codelab/backend-application-atom'
import { ReadAdminDataService } from '@codelab/backend-application-data'
import { ImportSystemTypesCommand } from '@codelab/backend-application-type'
import { UserDomainService } from '@codelab/backend-domain-user'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { LogClassMethod } from '@codelab/backend-infra-core'
import { DatabaseService } from '@codelab/backend-infra-adapter-neo4j-driver'
import { IAtomType } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Injectable()
export class SeederApplicationService {
  constructor(
    private readonly commandBus: CommandBus,
    private userDomainService: UserDomainService,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly databaseService: DatabaseService,
    private readonly atomApplicationService: AtomApplicationService,
    private logger: PinoLoggerService,
  ) {}

  async resetAndSeedUser() {
    await this.databaseService.resetDatabase()

    return await this.userDomainService.seedUserFromRequest()
  }

  /**
   * Need a function to seed the basic data required for creating some atom/component/types.
   *
   * Ran into issue of needing some data for integration test with a task involving custom resolvers for loading dependent types for some element.
   *
   * There are other seeder functions in this class, but we could have multiple for different reasons
   */
  async seedDataForElementDependentTypesResolver() {
    await this.userDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await this.atomApplicationService.addAtomsFromTypes([
      IAtomType.AntDesignButton,
    ])
  }

  /**
   * The minimum required data
   */
  async setupDevBootstrapData() {
    await this.userDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await this.atomApplicationService.addAtomsFromTypes([
      IAtomType.ReactFragment,
    ])
  }

  /**
   * We call this reinitialize because we reset the data first then import some data.
   *
   * Before we called reset or setup, but those words don't describe clearing then re-adding data
   */
  @LogClassMethod()
  async setupE2eData() {
    await this.databaseService.resetDatabase()

    await this.userDomainService.seedUserFromRequest()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await this.atomApplicationService.addAtomsFromTypes([
      IAtomType.ReactFragment,
    ])
  }
}
