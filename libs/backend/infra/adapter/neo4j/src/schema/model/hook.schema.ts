import { gql } from '@apollo/client'

export const hookSchema = gql`
  type Hook {
    id: ID! @id
    type: AtomType!
    config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)
    element: Element! @relationship(type: "HOOKS_OF_ELEMENT", direction: IN)
  }
`
