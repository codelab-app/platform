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
    id: ID! @id(autogenerate: false)
    name: String!
    type: ActionKind! @readonly
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
    element: Element @relationship(type: "ELEMENT_ACTION", direction: OUT)
  }

  type CodeAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: CodeAction)
    store: Store!
    element: Element

    """
    Code to run when action is triggered
    """
    code: String!
  }

  type ApiAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: ApiAction)
    store: Store!
    element: Element

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
