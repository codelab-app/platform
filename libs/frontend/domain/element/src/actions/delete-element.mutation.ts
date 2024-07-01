import { graphql } from '@codelab/frontend/infra/gql'

export const DeleteElementsMutation = graphql(`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)
