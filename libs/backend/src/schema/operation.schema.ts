import { gql } from 'apollo-server-micro'

export const operationSchema = gql`
  type Operation {
    id: ID! @id
    name: String!
    runOnInit: Boolean @default(value: false)
    resource: Resource!
      @relationship(type: "RESOURCE_OPERATION", direction: OUT)
    config: Prop @relationship(type: "OPERATION_CONFIG", direction: OUT)
  }
`
