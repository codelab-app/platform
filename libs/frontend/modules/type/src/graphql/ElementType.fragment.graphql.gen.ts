import * as Types from '@codelab/shared/codegen/graphql'

export type ElementTypeFragment = {
  id: string
  name: string
  elementKind: Types.ElementTypeKind
}

export const ElementTypeFragmentDoc = gql`
  fragment ElementType on ElementType {
    id
    name
    elementKind
  }
`
