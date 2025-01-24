import { gql } from '@apollo/client'

export const hookSchema = gql`
  type Hook @node {
    id: ID! @settable(onUpdate: false) #@unique
    type: AtomType!
    config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)
    element: Element! @relationship(type: "HOOKS_OF_ELEMENT", direction: IN)
  }
`
