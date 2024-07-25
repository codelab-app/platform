'use server'

import { type CreateDomainsMutationVariables } from '@codelab/frontend/infra/gql'
import { domainApi } from './domain.api'

export const createDomainRepository = async ({
  input,
}: CreateDomainsMutationVariables) => domainApi.CreateDomains({ input })
