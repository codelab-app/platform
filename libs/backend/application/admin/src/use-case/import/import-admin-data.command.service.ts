import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import type { IBaseDataPaths } from '@codelab/backend/application/data'
import { ReadAdminDataService } from '@codelab/backend/application/data'
import { ImportTagsCommand } from '@codelab/backend/application/tag'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import type { IAtomAggregate } from '@codelab/shared/abstract/core'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import omit from 'lodash/omit'

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
  ) {}

  async execute({ baseDataPaths }: ImportAdminDataCommand) {
    if (baseDataPaths) {
      this.readAdminDataService.migrationDataService.basePaths = baseDataPaths
    }

    /**
     * System types must be seeded first, so other types can reference it
     */
    await this.importSystemTypes()

    await this.importTags()

    await this.importAtoms()

    await this.importComponents()
  }

  private async importAtom(atom: IAtomAggregate) {
    await this.commandBus.execute<ImportAtomCommand>(
      new ImportAtomCommand(atom),
    )
  }

  private async importAtoms() {
    const atoms = this.readAdminDataService.atoms

    /**
     * Create all atoms but omit `suggestedChildren`, since it requires all atoms to be added first
     */
    for (const atom of this.readAdminDataService.atoms) {
      const atomWithoutSuggestedChildren = omit(atom, ['suggestedChildren'])

      await this.importAtom(atomWithoutSuggestedChildren as IAtomAggregate)
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
