import type { IAtom, IUserRef } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
import { atomsData } from './atom'

export class SeedAtomsService extends IUseCase<IUserRef, void> {
  atomRepository: AtomRepository = new AtomRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  tagRepository: TagRepository = new TagRepository()

  async _execute(owner: IUserRef) {
    const atoms = await this.createAtomsData(owner)

    /**
     * Create all atoms but omit `suggestedChildren` and `requiredParents`, since those are required
     */
    await Promise.all(
      atoms.map(
        // Omit `suggestedChildren` and `requiredParents`, since they require all atoms to be added first
        async ({ suggestedChildren, requiredParents, ...atom }) =>
          await this.atomRepository.save(atom, { name: atom.name }),
      ),
    )

    /**
     * Here we assign suggestedChildren and requiredParents, since all atoms must be created first
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
  async createAtomsData(owner: IUserRef): Promise<Array<IAtom>> {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.all()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    return await Promise.all(
      ObjectTyped.entries(atomsData).map(async ([atomType, atomData]) => {
        // Search api by name
        const existingApi = existingInterfaceTypes.get(
          InterfaceType.getApiName({ name: atomType }),
        )

        const api = existingApi
          ? existingApi
          : InterfaceType.createFromAtomName(atomType, owner)

        // Get tags by name, they always match up
        const existingTag = await this.tagRepository.find({
          name: atomData?.tag ?? '',
        })

        if (!existingTag) {
          console.log(atomData?.tag)
          throw new Error('Tag should exist already')
        }

        return {
          id: v4(),
          name: atomType,
          type: IAtomType[atomType],
          icon: atomData?.icon,
          tags: [existingTag],
          api,
        }
      }),
    )
  }
}
