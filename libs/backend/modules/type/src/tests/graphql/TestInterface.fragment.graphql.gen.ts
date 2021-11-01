import * as Types from '@codelab/shared/codegen/graphql'

export type TestInterfaceFragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
}

export const TestInterfaceFragmentDoc = gql`
  fragment TestInterface on InterfaceType {
    __typename
    id
    name
  }
`
