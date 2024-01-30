import { gql } from '@apollo/client'

export const elementOgmSchema = gql`
  type Element {
    dependantTypes: [AnyType!]! @customResolver(requires: "id")
  }
`
