import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import type { IAtomDto, IRef } from '@codelab/shared/abstract/core'
import type {
  AtomCreateInput,
  AtomDeleteInput,
  AtomOptions,
  AtomUniqueWhere,
  AtomUpdateInput,
  AtomWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  filterNotHookType,
} from '@codelab/frontend/abstract/domain'
import { atomMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'
import {
  AtomList,
  CreateAtoms,
  DeleteAtoms,
  GetSelectAtomOptions,
  UpdateAtoms,
} from '@codelab/shared-domain-module-atom/server'
import { withTracingMethods } from '@codelab/shared-infra-sentry'
import { prop, sortBy } from 'remeda'

export const atomRepository: IAtomRepository = withTracingMethods('atom', {
  add: async (input: IAtomDto) => {
    const {
      createAtoms: { atoms },
    } = await CreateAtoms({ input: atomMapper.toCreateInput(input) }, { revalidateTag: CACHE_TAGS.ATOM_LIST })

    const createdAtom = atoms[0]

    Validator.assertsDefined(createdAtom)

    return createdAtom
  },

  delete: async (atoms: Array<IRef>) => {
    const {
      deleteAtoms: { nodesDeleted },
    } = await DeleteAtoms({
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

  update: async ({ id }: IRef, input: IAtomDto) => {
    const {
      updateAtoms: { atoms },
    } = await UpdateAtoms(
      {
        update: atomMapper.toUpdateInput(input),
        where: { id },
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
