import { gql } from 'graphql-request'

export const actionSchema = gql`
  enum ActionKind {
    """
    Action with custom code
    """
    CustomAction

    """
    Action responsible for fetching data from a resource
    """
    ResourceAction
  }

  interface ActionBase {
    id: ID! @id(autogenerate: false)
    name: String!
    type: ActionKind! @readonly
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
  }

  type CustomAction implements ActionBase {
    id: ID!
    name: String!
    type: ActionKind! @default(value: CustomAction)
    store: Store!

    """
    Code to run when action is triggered
    """
    code: String!
  }

  type ResourceAction implements ActionBase {
    id: ID!
    name: String!
    type: ActionKind! @default(value: ResourceAction)
    store: Store!

    """
    Response handlers
    """
    successAction: AnyAction!
      @relationship(type: "SUCCESS_ACTION", direction: OUT)
    errorAction: AnyAction! @relationship(type: "ERROR_ACTION", direction: OUT)

    """
    Resource to fetch data from
    """
    resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)
    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)
  }

  union AnyAction = ResourceAction | CustomAction
`
