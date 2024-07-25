'use server'

import { type DeleteDomainsMutationVariables } from '@codelab/frontend/infra/gql'
import { domainApi } from './domain.api'

export const deleteDomainsRepository = async ({
  where,
}: DeleteDomainsMutationVariables) => domainApi.DeleteDomains({ where })
