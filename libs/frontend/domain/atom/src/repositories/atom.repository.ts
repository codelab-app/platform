import type { IAtomRepository } from '@codelab/frontend/abstract/domain'
import type { IAtomDto, IRef } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import type {
  AtomOptions,
  AtomUniqueWhere,
  AtomWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  filterNotHookType,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  atomMapper,
  atomServerActions,
} from '@codelab/shared-domain-module-atom'
import { withTracingMethods } from '@codelab/shared-infra-sentry'
import { prop, sortBy } from 'remeda'

const {
  AtomList,
  CreateAtoms,
  DeleteAtoms,
  GetSelectAtomOptions,
  UpdateAtoms,
} = atomServerActions

export const atomRepository: IAtomRepository = withTracingMethods('atom', {
  add: async (input: IAtomDto, options?: NextFetchOptions) => {
    const {
      createAtoms: { atoms },
    } = await CreateAtoms(
      { input: atomMapper.toCreateInput(input) },
      options,
      // { revalidateTag: CACHE_TAGS.ATOM_LIST },
    )

    const createdAtom = atoms[0]

    Validator.assertsDefined(createdAtom)

    return createdAtom
  },

  delete: async (atoms: Array<IRef>) => {
    const {
      deleteAtoms: { nodesDeleted },
    } = await DeleteAtoms({
      delete: {
        api: {},
      },
      where: { id_IN: atoms.map(({ id }) => id) },
    })

    return nodesDeleted
  },

  find: async (where?: AtomWhere, options?: AtomOptions) => {
    return await AtomList({ options, where }, { tags: [CACHE_TAGS.ATOM_LIST] })
  },

  findOne: async (where: AtomUniqueWhere) => {
    return (await atomRepository.find(where)).items[0]
  },

  getSelectAtomOptions: async () => {
    const { atoms } = await GetSelectAtomOptions(
      {},
      { tags: [CACHE_TAGS.ATOM_LIST] },
    )

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      prop('name'),
    )
  },

  update: async ({ id }: IRef, input: IAtomDto, options?: NextFetchOptions) => {
    const {
      updateAtoms: { atoms },
    } = await UpdateAtoms(
      {
        update: atomMapper.toUpdateInput(input),
        where: { id },
      },
      options,
      // {
      //   revalidateTag: CACHE_TAGS.ATOM_LIST,
      // },
    )

    const updatedAtom = atoms[0]

    Validator.assertsDefined(updatedAtom)

    return updatedAtom
  },
})
