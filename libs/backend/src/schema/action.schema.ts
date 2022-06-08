import { gql } from 'graphql-request'

export const actionSchema = gql`
  enum ActionKind {
    """
    Action with custom code
    """
    Custom

    """
    Action responsible for fetching data from a resource
    """
    Resource

    """
    Represents a list of actions that runs in a certain order
    """
    Pipeline
  }

  interface ActionBase {
    id: ID! @id(autogenerate: false)
    name: String!
    type: ActionKind! @readonly
    runOnInit: Boolean! @default(value: false)
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
  }

  type CustomAction implements ActionBase {
    id: ID!
    name: String! @unique
    type: ActionKind! @default(value: Custom)
    runOnInit: Boolean! @default(value: false)
    store: Store!

    """
    Code to run when action is triggered
    """
    code: String!
  }

  type ResourceAction implements ActionBase {
    id: ID!
    name: String! @unique
    type: ActionKind! @default(value: Resource)
    runOnInit: Boolean! @default(value: false)
    store: Store!

    """
    Response handlers
    """
    success: ActionBase! @relationship(type: "SUCCESS_ACTION", direction: IN)
    error: ActionBase! @relationship(type: "ERROR_ACTION", direction: IN)

    """
    Resource to fetch data from
    """
    resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)
    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)
  }

  interface ActionsPipeLine @relationshipProperties {
    order: Int
  }

  type PipelineAction implements ActionBase {
    id: ID!
    name: String! @unique
    type: ActionKind! @default(value: Pipeline)
    runOnInit: Boolean! @default(value: false)
    store: Store!

    """
    List of actions to run in order
    """
    actions: [ActionBase!]!
      @relationship(
        type: "ACTION_PIPELINE"
        properties: "ActionsPipeLine"
        direction: OUT
      )
  }
`
