import * as Types from '@codelab/shared/codegen/graphql'

export type InterfaceFragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
}

export const InterfaceFragmentDoc = gql`
  fragment Interface on InterfaceType {
    __typename
    id
    name
  }
`
