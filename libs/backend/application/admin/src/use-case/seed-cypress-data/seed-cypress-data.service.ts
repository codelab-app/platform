import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ReadAdminDataService } from '../../../../shared/src/data/read-admin-data.service'

@Injectable()
export class SeedCypressDataService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  async execute() {
    const types = this.readAdminDataService.systemTypes

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(types),
    )

    for (const atom of this.readAdminDataService.atoms) {
      await this.commandBus.execute<ImportAtomCommand>(
        new ImportAtomCommand(atom),
      )
    }
  }
}
