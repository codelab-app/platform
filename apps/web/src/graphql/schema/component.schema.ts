import { gql } from 'apollo-server-micro'

export const componentSchema = gql`
  type Component {
    id: ID! @id
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: IN)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }

  #  extend type Component
  #    @auth(
  #      rules: [
  #        {
  #          operations: [READ, UPDATE, DELETE]
  #          where: { owner: { auth0Id: "$jwt.sub" } }
  #        }
  #        {
  #          operations: [READ, UPDATE, DELETE]
  #          bind: { owner: { auth0Id: "$jwt.sub" } }
  #        }
  #      ]
  #    )
`
