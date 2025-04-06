import type { IAtomRepository } from '@codelab/frontend/abstract/domain'
import type { IAtomDto, IRef } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gqlgen'

import { Validator } from '@codelab/shared/infra/typebox'
import {
  atomMapper,
  atomServerActions,
} from '@codelab/shared-domain-module/atom'

const { AtomList, CreateAtoms, DeleteAtoms, UpdateAtoms } = atomServerActions

export const atomRepository: IAtomRepository = {
  add: async (input: IAtomDto, next?: NextFetchOptions) => {
    const {
      createAtoms: { atoms },
    } = await CreateAtoms({ input: atomMapper.toCreateInput(input) }, next)

    const createdAtom = atoms[0]

    Validator.assertsDefined(createdAtom)

    return createdAtom
  },

  delete: async (atoms: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteAtoms: { nodesDeleted },
    } = await DeleteAtoms(
      {
        delete: {
          api: {},
        },
        where: { id_IN: atoms.map(({ id }) => id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: AtomWhere,
    options?: AtomOptions,
    next?: NextFetchOptions,
  ) => {
    return await AtomList({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: AtomWhere, next?: NextFetchOptions) => {
    // We rely on the find method's unique caching mechanism
    const result = await atomRepository.find(where, {}, next)

    return result.items[0]
  },

  update: async ({ id }: IRef, input: IAtomDto, next?: NextFetchOptions) => {
    const {
      updateAtoms: { atoms },
    } = await UpdateAtoms(
      {
        update: atomMapper.toUpdateInput(input),
        where: { id },
      },
      next,
    )

    const updatedAtom = atoms[0]

    Validator.assertsDefined(updatedAtom)

    return updatedAtom
  },
}
