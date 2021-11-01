import * as Types from '@codelab/shared/codegen/graphql'

export type TestArrayTypeFragment = { id: string; name: string }

export const TestArrayTypeFragmentDoc = gql`
  fragment TestArrayType on ArrayType {
    id
    name
  }
`
