import { gql } from 'apollo-server-micro'

export const appSchema = gql`
  type App {
    id: ID! @id
    owner: [User!]! @relationship(type: "OWNED_BY", direction: OUT)
    name: String! @unique
    pages: [Page!]! @relationship(type: "PAGES", direction: IN)
    rootProviderElement: Element! @relationship(type: "ROOT", direction: IN)
  }

  # extend type App
  #   @auth(
  #     rules: [
  #       {
  #         operations: [CONNECT, DISCONNECT]
  #         bind: { owner: { id: "$jwt.sub" } }
  #       }
  #     ]
  #   )
`
