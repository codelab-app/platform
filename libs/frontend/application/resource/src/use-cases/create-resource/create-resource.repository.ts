import { graphql, type ResourceCreateInput } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const CreateResourcesDocument = graphql(`
  mutation CreateResources($input: [ResourceCreateInput!]!) {
    createResources(input: $input) {
      resources {
        id
      }
    }
  }
`)

export const createResourcesRepository = async (input: ResourceCreateInput) => {
  await gqlFetch(CreateResourcesDocument, { input })
}
