import type { IAtomRecords } from '@codelab/backend/abstract/core'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import {
  type IAtomDto,
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

export class SeedAtomsCommand {
  constructor(public data: Partial<IAtomRecords>) {}
}
@CommandHandler(SeedAtomsCommand)
export class SeedAtomsHandler
  implements ICommandHandler<SeedAtomsCommand, Array<IAtomDto>>
{
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private tagRepository: TagRepository,
    private authDomainService: AuthDomainService,
  ) {}

  async execute({ data }: SeedAtomsCommand) {
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
  private async createAtomsData(
    data: Partial<IAtomRecords>,
  ): Promise<Array<IAtomDto>> {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.find()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    return await Promise.all(
      ObjectTyped.entries(data).map(async ([atomType, atomData]) => {
        if (!atomData) {
          throw new Error('Missing data')
        }

        // Search api by name
        const existingApi = existingInterfaceTypes.get(
          InterfaceType.getApiName({ name: atomType }),
        )

        if (!existingApi) {
          throw new Error('Atom API should exist already')
        }

        // Get tags by name, they always match up
        const existingTag = await this.tagRepository.findOneOrFail({
          where: {
            name: atomData.tag,
          },
        })

        return {
          __typename: IElementRenderTypeKind.Atom,
          api: existingApi,
          icon: atomData.icon,
          id: v4(),
          name: atomType,
          owner: this.authDomainService.currentUser,
          tags: [existingTag],
          type: IAtomType[atomType],
        }
      }),
    )
  }
}
