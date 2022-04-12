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
    config: String!
  }

  type Operation {
    id: ID! @id
    name: String!
    resource: Resource! @relationship(type: "QUERY_RESOURCE", direction: OUT)
    config: String!
  }
`
