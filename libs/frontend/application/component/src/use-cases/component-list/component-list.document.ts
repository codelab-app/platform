import { graphql } from '@codelab/frontend/infra/gql'

export const ComponentListDocument = graphql(`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
`)
