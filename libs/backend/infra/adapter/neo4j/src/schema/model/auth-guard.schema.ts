import { gql } from '@apollo/client'

export const authGuardSchema = gql`
  type AuthGuard {
    id: ID! @unique
    # callback (request:NextApiContext, resource?:Resource) => Promise<boolean>
    canActivate: String!
    # acts as a container for config to avoid manipulating raw urls and tokens inside canActivate
    resource: Resource
      @relationship(type: "RESOURCE_OF_AUTH_GUARD", direction: OUT)
    # redirect to another page inside the app or to a given url
  }
`
