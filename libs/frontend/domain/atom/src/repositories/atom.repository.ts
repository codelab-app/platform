import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { filterNotHookType } from '@codelab/frontend/abstract/domain'
import type {
  AtomOptions,
  AtomUniqueWhere,
  AtomWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import sortBy from 'lodash/sortBy'
import { atomApi } from './atom.api'

export const atomRepository: IAtomRepository = {
  add: async (atom: IAtomModel) => {
    console.log(atom.toCreateInput())

    const {
      createAtoms: { atoms },
    } = await atomApi.CreateAtoms({ input: [atom.toCreateInput()] })

    const createdAtom = atoms[0]

    assertIsDefined(createdAtom)

    return createdAtom
  },

  delete: async (atoms: Array<IAtomModel>) => {
    const {
      deleteAtoms: { nodesDeleted },
    } = await atomApi.DeleteAtoms({
      where: { id_IN: atoms.map(({ id }) => id) },
    })

    return nodesDeleted
  },

  find: async (where?: AtomWhere, options?: AtomOptions) => {
    return await atomApi.AtomList({ options, where })
  },

  findOne: async (where: AtomUniqueWhere) => {
    return (await atomRepository.find(where)).items[0]
  },

  getSelectAtomOptions: async () => {
    const { atoms } = await atomApi.GetSelectAtomOptions({})

    return sortBy(
      atoms.filter(({ type }) => filterNotHookType(type)),
      'name',
    )
  },

  update: async (atom: IAtomModel) => {
    const {
      updateAtoms: { atoms },
    } = await atomApi.UpdateAtoms({
      update: atom.toUpdateInput(),
      where: { id: atom.id },
    })

    const updatedAtom = atoms[0]

    assertIsDefined(updatedAtom)

    return updatedAtom
  },
}
