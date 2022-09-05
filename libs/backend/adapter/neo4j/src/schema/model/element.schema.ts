import { gql } from 'apollo-server-micro'

export const elementSchema = gql`
  type ElementGraph @exclude {
    id: ID!
    descendants: [ID!]!
  }

  interface ParentOfElement @relationshipProperties {
    order: Int
  }

  type Element {
    id: ID! @id(autogenerate: false)
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)

    childrenRoot: Element @relationship(type: "TREE_SUB_ROOT", direction: IN)
    subRootOf: Element @relationship(type: "TREE_SUB_ROOT", direction: OUT)

    # Used for reverse lookup to see whether element is detached
    app: App @relationship(type: "ROOT_APP_ELEMENT", direction: OUT)
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)
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

    # component to render
    instanceOfComponent: Component
      @relationship(type: "INSTANCE_OF_COMPONENT", direction: OUT)

    # element is the rootElement for this component
    component: Component @relationship(type: "COMPONENT_ROOT", direction: IN)
    atom: Atom @relationship(type: "RENDER_ATOM", direction: OUT)
    hooks: [Hook!]! @relationship(type: "HOOKS_OF_ELEMENT", direction: OUT)
    propMapBindings: [PropMapBinding!]!
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: OUT)
  }

  input ElementGraphInput {
    rootId: String!
  }

  type Query {
    elementGraph(input: ElementGraphInput!): ElementGraph!
  }
`
