import { __RenderTypeKind } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'

const renderTypeKindSchema = `enum RenderTypeKind {
  ${Object.values(__RenderTypeKind).join('\n')}
}`

export const elementSchema = gql`
  interface ParentOfElement @relationshipProperties {
    order: Int
  }

  ${renderTypeKindSchema}

  # Create this to match frontend
  type RenderType @exclude {
    id: ID!
    kind: RenderTypeKind!
  }

  type Element {
    id: ID! @id(autogenerate: false)
    name: String!
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)
    firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)
    parent: Element @relationship(type: "TREE_FIRST_CHILD", direction: OUT)
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)

    # element is the rootElement for this component
    parentComponent: Component
      @relationship(type: "COMPONENT_ROOT", direction: IN)
    # Used for the css the user types it manually using the integrated code editor. This is
    # a pure css string.
    customCss: String
    # Used for the css set by the styling UI. This is a stringified json object of the form:
    # {[prop: string]: string}, where the prop is a css property and the value is its value.
    guiCss: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfExpression: String

    preRenderAction: BaseAction
      @relationship(type: "ELEMENT_ACTION", direction: OUT)
    postRenderAction: BaseAction
      @relationship(type: "ELEMENT_ACTION", direction: OUT)

    # Type of element to render, could be either a component or atom
    renderComponentType: Component
      @relationship(type: "RENDER_COMPONENT_TYPE", direction: OUT)
    renderAtomType: Atom @relationship(type: "RENDER_ATOM_TYPE", direction: OUT)
    renderType: RenderType

    # This is a custom field resolver
    descendantElements: [Element!]!
  }
`
