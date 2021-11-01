import * as Types from '@codelab/shared/codegen/graphql'

export type TestComponentTypeFragment = { id: string; name: string }

export const TestComponentTypeFragmentDoc = gql`
  fragment TestComponentType on ComponentType {
    id
    name
  }
`
