import { ResourceType } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'
import { values } from 'lodash'

const resourceType = `enum ResourceType {${values(ResourceType).join('\n')}}`

export const resourceSchema = gql`
  ${resourceType}

  type Resource {
    id: ID! @id
    type: ResourceType!
    name: String!
    config: String! @default(value: "{}")
    operations: [Operation!]!
      @relationship(type: "RESOURCE_OPERATION", direction: IN)
  }

  type Operation {
    id: ID! @id
    name: String!
    resource: Resource!
      @relationship(type: "RESOURCE_OPERATION", direction: OUT)
    config: String! @default(value: "{}")
  }
`
