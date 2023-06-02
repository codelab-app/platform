import { gql } from '@apollo/client'

export const domainSchema = gql`
  # Copied from generated schema
  type DeleteInfo @exclude {
    bookmark: String
    nodesDeleted: Int!
    relationshipsDeleted: Int!
  }

  type VercelDomainConfig @exclude {
    misconfigured: Boolean!
  }

  type VercelProjectDomain @exclude {
    verified: Boolean!
  }

  type Domain {
    id: ID! @id(autogenerate: false)
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: VercelDomainConfig!
    projectDomain: VercelProjectDomain!
  }

  # We need custom resolvers to interact with Vercel API, @callback doesn't work for delete
  type Mutation {
    createDomains(input: [DomainCreateInput!]!): CreateDomainsMutationResponse!
    updateDomains(
      where: DomainWhere!
      update: DomainUpdateInput!
    ): UpdateDomainsMutationResponse!
    deleteDomains(id: String!): DeleteInfo!
  }
`
