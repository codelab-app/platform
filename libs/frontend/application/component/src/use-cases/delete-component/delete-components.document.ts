import { graphql } from '@codelab/frontend/infra/gql'

export const DeleteComponentsDocument = graphql(`
  mutation DeleteComponents(
    $where: ComponentWhere!
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)
