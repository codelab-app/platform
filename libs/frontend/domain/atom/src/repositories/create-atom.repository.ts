import type {
  IAtomModel,
  IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { type AtomCreateInput, graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const CreateAtomDocument = graphql(`
  mutation CreateAtoms($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      atoms {
        id
      }
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`)

export const createAtomRepository: IAtomRepository['add'] = async (
  atom: IAtomModel,
) => {
  const {
    createAtoms: { atoms },
  } = await gqlFetch(CreateAtomDocument, { input: atom.toCreateInput() })

  return atoms[0]
}
