import type { IAtomRecords } from '@codelab/backend/abstract/core'
import {
  AuthService,
  CurrentUser,
  UseCase,
} from '@codelab/backend/application/shared'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { type IAtomDTO, IAtomType } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

@Injectable()
export class SeedAtomsService extends UseCase<
  Partial<IAtomRecords>,
  Array<IAtomDTO>
> {
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private tagRepository: TagRepository,
    private authService: AuthService,
  ) {
    super()
  }

  async _execute(data: IAtomRecords) {
    const atoms = await this.createAtomsData(data)

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

    return atoms
  }

  /**
   * Assume all tags have already been created
   */
  async createAtomsData(data: IAtomRecords): Promise<Array<IAtomDTO>> {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.find()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    return await Promise.all(
      ObjectTyped.entries(data).map(async ([atomType, atomData]) => {
        // Search api by name
        const existingApi = existingInterfaceTypes.get(
          InterfaceType.getApiName({ name: atomType }),
        )

        if (!existingApi) {
          throw new Error('Atom API should exist already')
        }

        // Get tags by name, they always match up
        const existingTag = await this.tagRepository.findOne({
          name: atomData.tag,
        })

        if (!existingTag) {
          console.log(atomData)
          throw new Error('Tag should exist already')
        }

        return {
          api: existingApi,
          icon: atomData.icon,
          id: v4(),
          name: atomType,
          owner: this.authService.currentUser,
          tags: [existingTag],
          type: IAtomType[atomType],
        }
      }),
    )
  }
}
