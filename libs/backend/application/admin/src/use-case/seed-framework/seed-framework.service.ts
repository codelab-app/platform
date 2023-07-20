import type { IAtomRecords, TagNode } from '@codelab/backend/abstract/core'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { AuthUseCase } from '@codelab/backend/application/service'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedEmptyApiService,
  systemTypesData,
  TypeSeederService,
} from '@codelab/backend/application/type'
import type {
  IAtomDTO,
  IAtomType,
  IFieldDTO,
} from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
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
export class SeedFrameworkService extends AuthUseCase<FrameworkData, void> {
  seeder = new TypeSeederService()

  async _execute(data: FrameworkData) {
    await withTracing('SeedFrameworkService.seedSystemTypes()', () =>
      this.seedSystemTypes(),
    )()

    await withTracing('SeedFrameworkService.seedTags()', () =>
      this.seedTags(data.tags),
    )()

    await withTracing('SeedFrameworkService.seedEmptyApi()', () =>
      this.seedEmptyApi(ObjectTyped.keys(data.atoms)),
    )()

    const atoms = await withTracing('SeedFrameworkService.seedAtoms()', () =>
      this.seedAtoms(data.atoms),
    )()

    await withTracing('SeedFrameworkService.seedApis()', async () =>
      this.seedApis(await data.fields(atoms)),
    )()
  }

  private seedSystemTypes() {
    const types = Object.values(systemTypesData(this.owner))

    return this.seeder.seedTypes(types, this.owner)
  }

  private async seedAtoms(atoms: FrameworkData['atoms']) {
    return new SeedAtomsService(this.owner).execute(atoms)
  }

  private seedTags(tags: FrameworkData['tags']) {
    return new SeedTagsService(this.owner).execute(tags)
  }

  private async seedEmptyApi(atoms: Array<IAtomType>) {
    return new SeedEmptyApiService(this.owner).execute(atoms)
  }

  private async seedApis(fields: Array<IFieldDTO>) {
    return this.seeder.seedFields(fields)
  }
}
