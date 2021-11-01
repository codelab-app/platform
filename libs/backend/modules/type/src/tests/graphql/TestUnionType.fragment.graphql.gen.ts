import * as Types from '@codelab/shared/codegen/graphql'

export type TestUnionTypeFragment = { id: string; name: string }

export const TestUnionTypeFragmentDoc = gql`
  fragment TestUnionType on UnionType {
    id
    name
  }
`
