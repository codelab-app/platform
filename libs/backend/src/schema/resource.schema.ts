import { IResourceType } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'
import { values } from 'lodash'

const resourceType = `enum ResourceType {${values(IResourceType).join('\n')}}`

export const resourceSchema = gql`
  ${resourceType}

  type Resource implements WithOwner {
    id: ID! @id
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User!
  }
`
