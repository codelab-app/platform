import { graphql } from '@codelab/frontend/infra/gql'

export const DeletePagesMutation = graphql(`
  mutation DeletePages($where: PageWhere!, $delete: PageDeleteInput) {
    deletePages(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)
