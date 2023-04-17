import { gql } from 'apollo-server-micro'

export const configSchema = gql`
  type Config {
    id: ID! @id(autogenerate: false)
    name: String!
    app: App! @relationship(type: "APP_CONFIG", direction: OUT)
  }
`
