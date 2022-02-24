import { gql } from 'apollo-server-micro'

export const componentSchema = gql`
  type Component {
    id: ID! @id
    name: String!
    rootElement: Element! @relationship(type: "ROOT", direction: IN)
    owner: User! @relationship(type: "COMPONENTS", direction: OUT)
  }

  extend type Component
    @auth(
      rules: [
        { where: { owner: { auth0Id: "$jwt.sub" } } }
        { bind: { owner: { auth0Id: "$jwt.sub" } } }
      ]
    )
`
