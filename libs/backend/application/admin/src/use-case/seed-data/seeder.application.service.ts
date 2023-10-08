import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ReadAdminDataService } from '@codelab/backend/application/shared'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
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
  ) {}

  /**
   * The minimum required data
   */
  async seedBootstrapData() {
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
