import * as Types from '@codelab/shared/codegen/graphql'

export type TestPrimitiveTypeFragment = {
  id: string
  name: string
  primitiveKind: Types.PrimitiveTypeKind
}

export const TestPrimitiveTypeFragmentDoc = gql`
  fragment TestPrimitiveType on PrimitiveType {
    id
    name
    primitiveKind
  }
`
