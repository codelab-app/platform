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
    private seederApplicationService: SeederDomainService,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly adminRepository: AdminRepository,
  ) {}

  /**
   * The minimum required data
   */
  async seedDevBootstrapData() {
    await this.seederApplicationService.seedUserFromRequest()

    // in production we don't want to seed the database
    // each time any user logs-in
    if (process.env['NODE_ENV'] !== 'development') {
      return
    }

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

    await this.seederApplicationService.seedUserFromRequest()

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
