import type { IAtomRecords, TagNode } from '@codelab/backend/abstract/core'
import { SeedCypressAppCommand } from '@codelab/backend/application/app'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { UseCase } from '@codelab/backend/application/shared'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedEmptyApiService,
  systemTypesData,
  TypeSeederService,
} from '@codelab/backend/application/type'
import { withActiveSpan } from '@codelab/backend/infra/adapter/otel'
import {
  type IAtomDto,
  type IAtomType,
  type IFieldDto,
  IOwner,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ObjectTyped } from 'object-typed'

interface FrameworkData {
  atoms: Partial<IAtomRecords>
  tags: TagNode

  // This is a callback since we require atom data for fields to connect
  fields(atoms: Array<IAtomDto>): Promise<Array<IFieldDto>>
}

/**
 * A framework is like Ant Design,  Material UI, or even HTML itself.
 *
 * It contains atoms, api's, tags
 */
@Injectable()
export class SeedFrameworkService extends UseCase<FrameworkData, void> {
  constructor(
    private readonly typeSeederService: TypeSeederService,
    private readonly seedTagsService: SeedTagsService,
    private seedEmptyApiService: SeedEmptyApiService,
    protected readonly owner: IOwner,
    private seedAtomsService: SeedAtomsService,
    private commandBus: CommandBus,
  ) {
    super()
  }

  async _execute(data: FrameworkData) {
    await withActiveSpan('SeedFrameworkService.seedSystemTypes()', () =>
      this.commandBus.execute(new SeedCypressAppCommand()),
    )

    await withActiveSpan('SeedFrameworkService.seedTags()', () =>
      this.seedTags(data.tags),
    )

    await withActiveSpan('SeedFrameworkService.seedEmptyApi()', () =>
      this.seedEmptyApi(ObjectTyped.keys(data.atoms)),
    )

    const atoms = await withActiveSpan('SeedFrameworkService.seedAtoms()', () =>
      this.seedAtoms(data.atoms),
    )

    await withActiveSpan('SeedFrameworkService.seedApis()', async () =>
      this.seedApis(await data.fields(atoms)),
    )
  }

  private async seedApis(fields: Array<IFieldDto>) {
    return this.typeSeederService.seedFields(fields)
  }

  private async seedAtoms(atoms: FrameworkData['atoms']) {
    return this.seedAtomsService.execute(atoms)
  }

  private async seedEmptyApi(atoms: Array<IAtomType>) {
    return this.seedEmptyApiService.execute(atoms)
  }

  private seedTags(tags: FrameworkData['tags']) {
    return this.seedTagsService.execute(tags)
  }
}
