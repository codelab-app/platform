import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IRef } from '@codelab/shared/abstract/core'

const DeleteAtomsDocument = graphql(`
  mutation DeleteAtoms($where: AtomWhere!) {
    deleteAtoms(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const deleteAtomsRepository = async (atoms: Array<IRef>) =>
  gqlFetch(DeleteAtomsDocument, {
    where: { id_IN: atoms.map(({ id }) => id) },
  })
