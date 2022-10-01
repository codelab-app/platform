import { gql } from 'apollo-server-micro'

export const domainSchema = gql`
  type VercelDomainConfigData {
    misconfigured: Boolean!
  }

  type VercelProjectDomainData {
    verified: Boolean!
  }

  type Domain {
    id: ID! @id(autogenerate: false)
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: VercelDomainConfigData!
    projectDomain: VercelProjectDomainData!
  }

  input CreateDomainMutationInput {
    name: String!
    appId: String!
  }

  input UpdateDomainMutationInput {
    name: String!
    appId: String!
    id: ID!
  }

  type DeleteInfo {
    bookmark: String
    nodesDeleted: Int!
    relationshipsDeleted: Int!
  }

  type Mutation {
    createDomain(input: CreateDomainMutationInput): Domain!
    updateDomain(input: UpdateDomainMutationInput): Domain!
    deleteDomain(id: String!): DeleteInfo!
  }
`
