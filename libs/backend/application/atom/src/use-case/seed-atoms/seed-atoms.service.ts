import type { IAtom, IUserRef } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { IAtomType } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
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
     * Create all atoms but omit `allowedChildren`, since that is required
     */
    await Promise.all(
      atoms.map(
        // Omit `allowedChildren`, since it requires all atoms to be added first
        async ({ allowedChildren, ...atom }) =>
          await this.atomRepository.save(atom, { name: atom.name }),
      ),
    )

    /**
     * Here we assign allowedChildren, since all atoms must be created first
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
          api,
          icon: atomData?.icon,
          id: v4(),
          name: atomType,
          owner: connectAuth0Owner(owner),
          tags: [existingTag],
          type: IAtomType[atomType],
        }
      }),
    )
  }
}
