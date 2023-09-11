import { gql } from '@apollo/client'
import values from 'lodash/values'

enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export const resourceSchema = gql`
  enum ResourceType {${values(ResourceType).join('\n')}}

  type Resource implements WithOwner {
    id: ID! @unique
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User!
  }
`
