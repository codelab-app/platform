import * as Types from '@codelab/shared/codegen/graphql'

export type TestElementTypeFragment = {
  id: string
  name: string
  elementKind: Types.ElementTypeKind
}

export const TestElementTypeFragmentDoc = gql`
  fragment TestElementType on ElementType {
    id
    name
    elementKind
  }
`
