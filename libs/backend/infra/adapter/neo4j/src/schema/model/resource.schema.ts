import { gql } from 'apollo-server-micro'
import values from 'lodash/values'

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

    extend type Resource
    @auth(
      rules: [
        { operations: [CONNECT, DISCONNECT], roles: ["Admin", "User"] }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`
