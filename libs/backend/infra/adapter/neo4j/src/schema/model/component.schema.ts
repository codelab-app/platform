import { gql } from '@apollo/client'
import { authOwnerOrAdmin } from './user.schema'

export const componentSchema = gql`
  type Component implements WithOwner ${authOwnerOrAdmin} {
    id: ID! @unique
    # userId-name
    compositeKey: String! @unique
    name: String!
    slug: String! @customResolver(requires: "owner { id } compositeKey")
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    # contains the rootElement, and its descendants
    elements: [Element!]!
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!
    store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)
    props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)

    # This is the slot where prop children is rendered in the component instance
    # We may want multiple slots in the future
    # childrenContainerElement: Element!
    #  @relationship(type: "CHILDREN_CONTAINER_ELEMENT", direction: OUT)
  }
`
