import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IAtomDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
import type { AtomSeedData } from './atom'
import { atomsData } from './atom'

export class SeedAtomsService extends IUseCase<IAuth0Owner, void> {
  atomRepository: AtomRepository = new AtomRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  tagRepository: TagRepository = new TagRepository()

  /**
   * Allow subset to be seeded for testing
   */
  constructor(
    private readonly data: Partial<Record<IAtomType, AtomSeedData>> = atomsData,
  ) {
    super()
  }

  async _execute(owner: IAuth0Owner) {
    const atoms = await this.createAtomsData(owner)

    /**
     * Create all atoms but omit `suggestedChildren`, since that is required
     */
    await Promise.all(
      atoms.map(
        // Omit `suggestedChildren`, since it requires all atoms to be added first
        async ({ suggestedChildren, ...atom }) =>
          await this.atomRepository.save(atom, { name: atom.name }),
      ),
    )

    /**
     * Here we assign suggestedChildren, since all atoms must be created first
     */
    await Promise.all(
      atoms.map(
        async (atom) =>
          await this.atomRepository.save(atom, { name: atom.name }),
      ),
    )
  }

  /**
   * Assume all tags have already been created
   */
  async createAtomsData(owner: IAuth0Owner): Promise<Array<IAtomDTO>> {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.find()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    return await Promise.all(
      ObjectTyped.entries(this.data).map(async ([atomType, atomData]) => {
        // Search api by name
        const existingApi = existingInterfaceTypes.get(
          InterfaceType.getApiName({ name: atomType }),
        )

        const api = existingApi
          ? existingApi
          : InterfaceType.createFromAtomName(atomType, owner)

        // Get tags by name, they always match up
        const existingTag = await this.tagRepository.findOne({
          name: atomData?.tag ?? '',
        })

        if (!existingTag) {
          console.log(atomData?.tag)
          throw new Error('Tag should exist already')
        }

        return {
          api,
          icon: atomData?.icon,
          id: v4(),
          name: atomType,
          owner,
          tags: [existingTag],
          type: IAtomType[atomType],
        }
      }),
    )
  }
}
