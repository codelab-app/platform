import { gql } from '@apollo/client'

export const domainSchema = gql`
  type ProductionDomainConfig
    @query(read: false, aggregate: false)
    @mutation(operations: []) {
    misconfigured: Boolean!
  }

  type Domain @node {
    id: ID! @settable(onUpdate: false) #@unique
    # appId-name format to make it unique across apps
    # compositeKey: String! #@unique
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: ProductionDomainConfig!
  }
`
