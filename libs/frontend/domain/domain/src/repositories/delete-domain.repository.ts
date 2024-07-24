'use server'

import {
  type DeleteDomainsMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { domainApi } from './domain.api'

export const deleteDomainsRepository = async ({
  where,
}: DeleteDomainsMutationVariables) => domainApi.DeleteDomains({ where })
