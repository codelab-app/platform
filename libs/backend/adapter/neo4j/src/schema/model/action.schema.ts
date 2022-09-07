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

    """
    Represents a list of actions that runs in a certain order
    """
    PipelineAction
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
    name: String!
    type: ActionKind! @default(value: CustomAction)
    runOnInit: Boolean! @default(value: false)
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
    runOnInit: Boolean! @default(value: false)
    store: Store!

    """
    Response handlers
    """
    successAction: AnyAction!
      @relationship(type: "SUCCESS_ACTION", direction: IN)
    errorAction: AnyAction! @relationship(type: "ERROR_ACTION", direction: IN)

    """
    Resource to fetch data from
    """
    resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)
    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)
  }

  interface ActionsPipeLine @relationshipProperties {
    # use array because the same action could repeat
    # use String instead of Int due to : https://github.com/neo4j/graphql/issues/167
    orders: [String!]
  }

  union AnyAction = PipelineAction | ResourceAction | CustomAction

  type PipelineAction implements ActionBase {
    id: ID!
    name: String!
    type: ActionKind! @default(value: PipelineAction)
    runOnInit: Boolean! @default(value: false)
    store: Store!

    """
    List of actions to run in order
    """
    actions: [AnyAction!]!
      @relationship(
        type: "ACTION_PIPELINE"
        properties: "ActionsPipeLine"
        direction: OUT
      )
  }
`
