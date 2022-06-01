import { gql } from 'graphql-request'

export const actionSchema = gql`
  type Action {
    id: ID! @id
    name: String!

    runOnInit: Boolean! @default(value: false)

    resource: Resource @relationship(type: "RESOURCE_OPERATION", direction: OUT)

    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)

    body: String
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
  }
`
