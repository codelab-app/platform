import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import type {
  AtomCreateInput,
  AtomOptions,
  AtomUniqueWhere,
  AtomUpdateInput,
  AtomWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  filterNotHookType,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/schema'
import {
  AtomList,
  CreateAtoms,
  DeleteAtoms,
  GetSelectAtomOptions,
  UpdateAtoms,
} from '@codelab/shared-domain-module-atom/server'
import { withTracingMethods } from '@codelab/shared-infra-sentry'
import { revalidateTag } from 'next/cache'
import { prop, sortBy } from 'remeda'

export const atomRepository: IAtomRepository = withTracingMethods('atom', {
  add: async (input: AtomCreateInput) => {
    const {
      createAtoms: { atoms },
    } = await CreateAtoms({ input })

    const createdAtom = atoms[0]

    Validator.assertsDefined(createdAtom)

    return createdAtom
  },

  delete: async (atoms: Array<IAtomModel>) => {
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
    const { atoms } = await GetSelectAtomOptions({})

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      prop('name'),
    )
  },

  update: async ({
    update,
    where,
  }: {
    where: AtomWhere
    update: AtomUpdateInput
  }) => {
    const {
      updateAtoms: { atoms },
    } = await UpdateAtoms(
      {
        update,
        where,
      },
      {
        revalidateTag: CACHE_TAGS.ATOM_LIST,
      },
    )

    const updatedAtom = atoms[0]

    Validator.assertsDefined(updatedAtom)

    return updatedAtom
  },
})
