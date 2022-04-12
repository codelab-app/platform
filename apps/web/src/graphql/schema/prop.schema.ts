import { gql } from 'apollo-server-micro'

export const propSchema = gql`
  type Prop {
    id: ID! @id
    data: String! @default(value: "{}")
  }

  type PropMapBinding {
    id: ID! @id
    element: Element!
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: IN)
    targetElement: Element @relationship(type: "BIND_TO_ELEMENT", direction: IN)
    sourceKey: String! # Set to '*' to bind all incoming props
    targetKey: String! # Set to '*' to spread the incoming props to the outgoing ones
  }
`
