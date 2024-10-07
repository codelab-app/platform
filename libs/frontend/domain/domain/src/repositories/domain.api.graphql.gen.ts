import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './domain.api.documents.graphql.gen'

export const DomainList = (
  variables: DomainListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DomainListDocument.toString(), variables, next)

export const CreateDomains = (
  variables: CreateDomainsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateDomainsDocument.toString(), variables, next)

export const UpdateDomains = (
  variables: UpdateDomainsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateDomainsDocument.toString(), variables, next)

export const DeleteDomains = (
  variables: DeleteDomainsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteDomainsDocument.toString(), variables, next)
