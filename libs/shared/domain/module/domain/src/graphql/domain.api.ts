import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk } from './domain.api.graphql.api.gen'

import {
  CreateDomains,
  DeleteDomains,
  DomainList,
  UpdateDomains,
} from './domain.api.graphql.web.gen'

export const domainApi = () => getSdk(graphqlClient)

export const domainServerActions = {
  CreateDomains,
  DeleteDomains,
  DomainList,
  UpdateDomains,
}
