'use server'

import { type UpdateDomainsMutationVariables } from '@codelab/frontend/infra/gql'
import { domainApi } from './domain.api'

export const updateDomainRepository = async ({
  update,
  where,
}: UpdateDomainsMutationVariables) =>
  await domainApi.UpdateDomains({ update, where })
