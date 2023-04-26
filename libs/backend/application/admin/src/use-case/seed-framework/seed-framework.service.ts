import type { AtomSeedRecord, TagNode } from '@codelab/backend/abstract/core'
import { IAuthUseCase, IUseCase } from '@codelab/backend/abstract/types'
import { SeedAtomsService } from '@codelab/backend/application/atom'
import { SeedTagsService } from '@codelab/backend/application/tag'
import {
  SeedEmptyApiService,
  SeedFieldService,
  SeedTypeService,
  systemTypesData,
} from '@codelab/backend/application/type'
import type {
  IAtomDTO,
  IAuth0Owner,
  IFieldDTO,
} from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'

interface FrameworkData {
  atoms: AtomSeedRecord
  tags: TagNode

  // This is a callback since we require atom data for fields to connect
  fields(atoms: Array<IAtomDTO>): Promise<Array<IFieldDTO>>
}

/**
 * A framework is like Ant Design,  Material UI, or even HTML itself.
 *
 * It contains atoms, api's, tags
 */
export class SeedFrameworkService extends IAuthUseCase<FrameworkData, void> {
  async _execute(data: FrameworkData) {
    await this.seedSystemTypes()

    await this.seedTags(data.tags)

    await this.seedEmptyApi(ObjectTyped.keys(data.atoms))

    const atoms = await this.seedAtoms(data.atoms)

    await this.seedFields(await data.fields(atoms))
  }

  private async seedSystemTypes() {
    return new SeedTypeService(this.owner).execute(systemTypesData(this.owner))
  }

  private async seedAtoms(atoms: FrameworkData['atoms']) {
    return new SeedAtomsService(this.owner).execute(atoms)
  }

  private async seedTags(tags: FrameworkData['tags']) {
    return new SeedTagsService(this.owner).execute(tags)
  }

  private async seedEmptyApi(atoms: Array<IAtomType>) {
    return new SeedEmptyApiService(this.owner).execute(atoms)
  }

  private async seedFields(fields: Array<IFieldDTO>) {
    return new SeedFieldService(this.owner).execute(fields)
  }
}
