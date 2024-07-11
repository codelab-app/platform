import { graphql } from '@codelab/frontend/infra/gql'

export const DeleteComponentsMutation = graphql(`
  mutation DeleteComponents(
    $where: ComponentWhere!
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)
