import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  AtomOptions,
  AtomUniqueWhere,
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
  add: async (atom: IAtomModel) => {
    const {
      createAtoms: { atoms },
    } = await CreateAtoms({ input: [atom.toCreateInput()] })

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

  update: async (atom: IAtomModel) => {
    const {
      updateAtoms: { atoms },
    } = await UpdateAtoms(
      {
        update: atom.toUpdateInput(),
        where: { id: atom.id },
      },
      {
        // revalidateTag,
      },
    )

    const updatedAtom = atoms[0]

    Validator.assertsDefined(updatedAtom)

    return updatedAtom
  },
})
