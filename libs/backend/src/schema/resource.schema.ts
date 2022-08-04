import { gql } from 'apollo-server-micro'
import { values } from 'lodash'

enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export const resourceSchema = gql`
  enum ResourceType {${values(ResourceType).join('\n')}}

  type Resource implements WithOwner {
    id: ID! @id(autogenerate: false)
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User!
  }
`
