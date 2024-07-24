'use server'

import {
  type CreateDomainsMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { domainApi } from './domain.api'

export const createDomainRepository = async ({
  input,
}: CreateDomainsMutationVariables) => domainApi.CreateDomains({ input })
