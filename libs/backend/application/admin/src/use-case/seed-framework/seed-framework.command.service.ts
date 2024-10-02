import type { IAtomRecords, TagNode } from '@codelab/backend/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { SeedCypressAppCommand } from '@codelab/backend/application/app'
import { SeedAtomsCommand } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedEmptyApiCommand,
  TypeSeederService,
} from '@codelab/backend/application/type'
import {
  type IAtomDto,
  type IAtomType,
  type IFieldDto,
  type IOwner,
} from '@codelab/shared/abstract/core'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { ObjectTyped } from 'object-typed'

interface FrameworkData {
  atoms: Partial<IAtomRecords>
  tags: TagNode

  // This is a callback since we require atom data for fields to connect
  fields(atoms: Array<IAtomDto>): Promise<Array<IFieldDto>>
}

export class SeedFrameworkCommand {
  constructor(public data: FrameworkData) {}
}

/**
 * A framework is like Ant Design,  Material UI, or even HTML itself.
 *
 * It contains atoms, api's, tags
 */
@CommandHandler(SeedFrameworkCommand)
export class SeedFrameworkHandler
  implements ICommandHandler<SeedFrameworkCommand>
{
  constructor(
    private readonly typeSeederService: TypeSeederService,
    private readonly seedTagsService: SeedTagsService,
    protected readonly owner: IOwner,
    private commandBus: CommandBus,
  ) {}

  async execute({ data }: SeedFrameworkCommand) {
    await this.commandBus.execute(new SeedCypressAppCommand())

    await this.seedTags(data.tags)

    await this.seedEmptyApi(ObjectTyped.keys(data.atoms))

    const atoms = await this.seedAtoms(data.atoms)

    await this.seedApis(await data.fields(atoms))
  }

  private async seedApis(fields: Array<IFieldDto>) {
    return this.typeSeederService.seedFields(fields)
  }

  private async seedAtoms(atoms: FrameworkData['atoms']) {
    return this.commandBus.execute(new SeedAtomsCommand(atoms))
  }

  private async seedEmptyApi(atoms: Array<IAtomType>) {
    return this.commandBus.execute(new SeedEmptyApiCommand(atoms))
  }

  private seedTags(tags: FrameworkData['tags']) {
    return this.seedTagsService.execute(tags)
  }
}
