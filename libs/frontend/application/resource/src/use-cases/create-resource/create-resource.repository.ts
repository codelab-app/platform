import {
  execute,
  graphql,
  type ResourceCreateInput,
} from '@codelab/frontend/infra/gql'

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
  await execute(CreateResourcesDocument, { input })
}
