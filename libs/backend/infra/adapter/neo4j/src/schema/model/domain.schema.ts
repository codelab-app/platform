import { gql } from 'apollo-server-micro'

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
`
