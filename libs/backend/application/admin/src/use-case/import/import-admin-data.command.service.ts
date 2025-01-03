import type { IBaseDataPaths } from '@codelab/backend/application/data'
import type { IAtomImport } from '@codelab/shared/abstract/core'

import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { ReadAdminDataService } from '@codelab/backend/application/data'
import { ImportTagsCommand } from '@codelab/backend/application/tag'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { omit } from 'radash'

export class ImportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPaths?: string) {}
}

/**
 * During `save`, we'll want to replace the owner with the current
 */
@CommandHandler(ImportAdminDataCommand)
export class ImportAdminDataHandler
  implements ICommandHandler<ImportAdminDataCommand, void>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly logger: PinoLoggerService,
  ) {}

  async execute({ baseDataPaths }: ImportAdminDataCommand) {
    if (baseDataPaths) {
      this.readAdminDataService.migrationDataService.basePaths = baseDataPaths
    }

    /**
     * System types must be seeded first, so other types can reference it
     */
    this.logger.log('importSystemTypes', { context: 'ImportAdminDataHandler' })
    await this.importSystemTypes()

    this.logger.log('importTags', { context: 'ImportAdminDataHandler' })
    await this.importTags()

    this.logger.log('importAtoms', { context: 'ImportAdminDataHandler' })
    await this.importAtoms()

    this.logger.log('importComponents', { context: 'ImportAdminDataHandler' })
    await this.importComponents()
  }

  private async importAtom(atom: IAtomImport) {
    await this.commandBus.execute<ImportAtomCommand>(
      new ImportAtomCommand(atom),
    )
  }

  private async importAtoms() {
    const atoms = this.readAdminDataService.atoms

    /**
     * Create all atoms but omit `suggestedChildren`, since it requires all atoms to be added first
     */
    for (const { api, atom } of this.readAdminDataService.atoms) {
      const atomWithoutSuggestedChildren = omit(atom, ['suggestedChildren'])

      await this.importAtom({
        api,
        atom: atomWithoutSuggestedChildren,
      })
    }

    /**
     * Here we assign suggestedChildren, since all atoms must be created first
     */
    const atomsWithSuggestedChildren = atoms.filter(
      ({ atom }) => atom.suggestedChildren?.length,
    )

    for (const atom of atomsWithSuggestedChildren) {
      await this.importAtom(atom)
    }
  }

  private async importComponents() {
    for (const component of this.readAdminDataService.components) {
      await this.commandBus.execute(new ImportComponentsCommand(component))
    }
  }

  private async importSystemTypes() {
    return this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )
  }

  private async importTags() {
    const { tags } = this.readAdminDataService

    return this.commandBus.execute<ImportTagsCommand>(
      new ImportTagsCommand(tags),
    )
  }
}
