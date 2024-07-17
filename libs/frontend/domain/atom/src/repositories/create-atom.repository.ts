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

export const createAtomRepository = async (input: AtomCreateInput) => {
  return gqlFetch(CreateAtomDocument, { input })
}
