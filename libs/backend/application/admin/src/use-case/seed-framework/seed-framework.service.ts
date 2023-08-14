import type { IAtomRecords, TagNode } from '@codelab/backend/abstract/core'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { AuthUseCase } from '@codelab/backend/application/service'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedEmptyApiService,
  systemTypesData,
  TypeSeederService,
} from '@codelab/backend/application/type'
import {
  type IAtomDTO,
  type IAtomType,
  type IAuth0User,
  type IFieldDTO,
} from '@codelab/shared/abstract/core'
import { withActiveSpan } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import { ObjectTyped } from 'object-typed'

interface FrameworkData {
  atoms: Partial<IAtomRecords>
  tags: TagNode

  // This is a callback since we require atom data for fields to connect
  fields(atoms: Array<IAtomDTO>): Promise<Array<IFieldDTO>>
}

/**
 * A framework is like Ant Design,  Material UI, or even HTML itself.
 *
 * It contains atoms, api's, tags
 */
@Injectable()
export class SeedFrameworkService extends AuthUseCase<FrameworkData, void> {
  constructor(
    private readonly typeSeederService: TypeSeederService,
    private readonly seedTagsService: SeedTagsService,
    private seedEmptyApiService: SeedEmptyApiService,
    protected readonly owner: IAuth0User,
    private seedAtomsService: SeedAtomsService,
  ) {
    super(owner)
  }

  async _execute(data: FrameworkData) {
    await withActiveSpan('SeedFrameworkService.seedSystemTypes()', () =>
      this.seedSystemTypes(),
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

  private seedSystemTypes() {
    const types = Object.values(systemTypesData(this.owner))

    return this.typeSeederService.seedTypes(types, this.owner)
  }

  private async seedAtoms(atoms: FrameworkData['atoms']) {
    return this.seedAtomsService.execute(atoms)
  }

  private seedTags(tags: FrameworkData['tags']) {
    return this.seedTagsService.execute(tags)
  }

  private async seedEmptyApi(atoms: Array<IAtomType>) {
    return this.seedEmptyApiService.execute(atoms)
  }

  private async seedApis(fields: Array<IFieldDTO>) {
    return this.typeSeederService.seedFields(fields)
  }
}
