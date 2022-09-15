import { gql } from 'apollo-server-micro'

export const elementSchema = gql`
  interface ParentOfElement @relationshipProperties {
    order: Int
  }

  type Element {
    id: ID! @id(autogenerate: false)
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)
    firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)
    parent: Element @relationship(type: "TREE_FIRST_CHILD", direction: OUT)
    children: [Element!]!
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: OUT
      )
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)

    # An element could either have a parent element or a parent component
    parentElement: Element
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: IN
      )
    # element is the rootElement for this component
    parentComponent: Component
      @relationship(type: "COMPONENT_ROOT", direction: IN)

    # fixedId: String!, // This could be no longer needed with neo4j
    name: String
    # Used for the css the user types it manually using the integrated code editor. This is
    # a pure css string.
    customCss: String
    # Used for the css set by the styling UI. This is a stringified json object of the form:
    # {[prop: string]: string}, where the prop is a css property and the value is its value.
    guiCss: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfPropKey: String

    preRenderActionId: String
    postRenderActionId: String

    # Type of element to render, could be either a component or atom
    renderComponentType: Component
      @relationship(type: "RENDER_COMPONENT_TYPE", direction: OUT)
    renderAtomType: Atom @relationship(type: "RENDER_ATOM_TYPE", direction: OUT)

    hooks: [Hook!]! @relationship(type: "HOOKS_OF_ELEMENT", direction: OUT)
    propMapBindings: [PropMapBinding!]!
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: OUT)

    # This is a custom field resolver
    descendantElements: [Element!]!
  }
`
