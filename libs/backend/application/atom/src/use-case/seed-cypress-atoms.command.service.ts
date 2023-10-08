import { ReadAdminDataService } from '@codelab/backend/application/shared'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { type IAtomDTO } from '@codelab/shared/abstract/core'
import { atomTypes } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { ImportAtomCommand } from './import-atom.command.service'

export class SeedCypressAtomsCommand {}

@CommandHandler(SeedCypressAtomsCommand)
export class SeedCypressAtomsHandler
  implements ICommandHandler<SeedCypressAtomsCommand, Array<IAtomDTO>>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  /**
   * Default `atom` for `Element.renderType` may already exist, so we save by name
   */
  @Span()
  async execute() {
    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    const atoms = this.readAdminDataService.atoms.filter(({ atom }) =>
      atomTypes.includes(atom.type),
    )

    return Promise.all(
      atoms.map((atom) =>
        this.commandBus.execute<ImportAtomCommand, IAtomDTO>(
          new ImportAtomCommand(atom),
        ),
      ),
    )
  }
}
