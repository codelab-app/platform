'use server'

import {
  graphql,
  type UpdateDomainsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { domainApi } from './domain.api'

export const updateDomainRepository = async ({
  update,
  where,
}: UpdateDomainsMutationVariables) =>
  await domainApi.UpdateDomains({ update, where })
