import { gql } from '@apollo/client'

export const domainSchema = gql`
  type ProductionDomainConfig
    @query(read: false, aggregate: false)
    @mutation(operations: []) {
    misconfigured: Boolean!
  }

  type Domain {
    id: ID! @unique
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: ProductionDomainConfig!
  }
`
