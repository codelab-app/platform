import { gql } from 'apollo-server-micro'

export const configSchema = gql`
  type Config {
    id: ID! @id(autogenerate: false)
    name: String!
    app: App! @relationship(type: "APP_CONFIG", direction: OUT)
  }
`
// API_KEY: AIzaSyAWWMfW9JJ5DMmsn9NyZLYp4VVA6Q3h_EQ
