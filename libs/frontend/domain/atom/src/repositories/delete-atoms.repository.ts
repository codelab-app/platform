import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const DeleteAtomsDocument = graphql(`
  mutation DeleteAtoms($where: AtomWhere!) {
    deleteAtoms(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const deleteAtomsRepository: IAtomRepository['delete'] = async (
  atoms: Array<IAtomModel>,
) => {
  const {
    deleteAtoms: { nodesDeleted },
  } = await gqlFetch(DeleteAtomsDocument, {
    where: { id_IN: atoms.map(({ id }) => id) },
  })

  return nodesDeleted
}
