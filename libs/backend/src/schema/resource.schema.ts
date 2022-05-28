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
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
  }
`
