import { gql } from '@apollo/client'

export const componentSchema = gql`
  type Component implements WithOwner {
    id: ID! @unique
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!
    store: Store! @relationship(type: "STORE_OF_COMPONENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)

    # Function to extract a unique key from component input
    keyGenerator: String

    # This is the slot where prop children is rendered in the component instance
    # We may want multiple slots in the future
    childrenContainerElement: Element!
      @relationship(type: "CHILDREN_CONTAINER_ELEMENT", direction: OUT)
  }

  extend type Component
    @authorization(
      validate: [{ where: { node: { owner: { id: "$jwt.sub" } } } }]
    )
`
