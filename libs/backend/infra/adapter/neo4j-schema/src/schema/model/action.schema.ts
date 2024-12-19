import { gql } from 'graphql-request'

export const actionSchema = gql`
  enum ActionKind {
    """
    Action with custom code
    """
    CodeAction

    """
    Action responsible for fetching data from a resource
    """
    ApiAction
  }

  interface BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @settable(onUpdate: false)
    store: Store! @declareRelationship
    preRenderElement: Element @declareRelationship
    postRenderElement: Element @declareRelationship
  }

  type CodeAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: CodeAction)
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
    preRenderElement: Element
      @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: IN)
    postRenderElement: Element
      @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: IN)
    """
    Code to run when action is triggered
    """
    code: String!
  }

  type ApiAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: ApiAction)
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
    preRenderElement: Element
      @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: IN)
    postRenderElement: Element
      @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: IN)
    """
    Response handlers
    """
    successAction: AnyAction
      @relationship(type: "SUCCESS_ACTION", direction: OUT)
    errorAction: AnyAction @relationship(type: "ERROR_ACTION", direction: OUT)

    """
    Resource to fetch data from
    """
    resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)
    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)
  }

  union AnyAction = ApiAction | CodeAction
`
