import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DomainFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type DomainListQueryVariables,
  type CreateDomainsMutationVariables,
  type UpdateDomainsMutationVariables,
  type DeleteDomainsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  DomainListDocument,
  CreateDomainsDocument,
  UpdateDomainsDocument,
  DeleteDomainsDocument,
} from './domain.api.graphql.docs.gen'

export const DomainList = (
  variables: DomainListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DomainListDocument.toString(), variables, next)

export const CreateDomains = (
  variables: CreateDomainsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateDomainsDocument.toString(), variables, next)

export const UpdateDomains = (
  variables: UpdateDomainsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateDomainsDocument.toString(), variables, next)

export const DeleteDomains = (
  variables: DeleteDomainsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteDomainsDocument.toString(), variables, next)
