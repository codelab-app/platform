import { gql } from '@apollo/client'

export const domainSchema = gql`
  type VercelDomainConfig
    @query(read: false, aggregate: false)
    @mutation(operations: []) {
    misconfigured: Boolean!
  }

  type VercelProjectDomain
    @query(read: false, aggregate: false)
    @mutation(operations: []) {
    verified: Boolean!
  }

  type Domain {
    id: ID! @unique
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: VercelDomainConfig!
    projectDomain: VercelProjectDomain!
  }
`
