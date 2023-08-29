import { gql } from '@apollo/client'
import { __RenderTypeKind } from '@codelab/shared/abstract/core'

const renderTypeKindSchema = `enum RenderTypeKind {
  ${Object.values(__RenderTypeKind).join('\n')}
}`

export const elementSchema = gql`
  ${renderTypeKindSchema}

  # Create this to match frontend
  type RenderType @exclude {
    id: ID!
    kind: RenderTypeKind!
  }

  union ContainerNode = Component | Page

  type Element {
    id: ID! @id(autogenerate: false)
    # storeId-name format to make it unique across store
    # being unique across page/component is equivalent to being unique across store
    _compoundName: String! @unique
    name: String! @customResolver(requires: ["id", "_compoundName"])
    slug: String! @customResolver(requires: ["id", "_compoundName"])
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
    childMapperPropKey: String
    childMapperComponent: Component
      @relationship(type: "CHILD_MAPPER_COMPONENT", direction: OUT)
    childMapperPreviousSibling: Element
      @relationship(type: "CHILD_MAPPER_PREVIOUS_SIBLING", direction: IN)
    renderForEachPropKey: String
    renderIfExpression: String

    preRenderAction: BaseAction
      @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: OUT)
    postRenderAction: BaseAction
      @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: OUT)

    # Type of element to render, could be either a component or atom
    renderComponentType: Component
      @relationship(type: "RENDER_COMPONENT_TYPE", direction: OUT)

    # Only register refs that are needed
    preserveRef: Boolean

    renderAtomType: Atom @relationship(type: "RENDER_ATOM_TYPE", direction: OUT)
    renderType: RenderType

    # These are a custom field resolvers
    closestContainerNode: ContainerNode!
    descendantElements: [Element!]!
  }
`
