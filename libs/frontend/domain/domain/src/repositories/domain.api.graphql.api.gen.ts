import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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

export const getSdk = () => ({
  DomainList: (variables: DomainListQueryVariables) =>
    gqlRequest(DomainListDocument.toString(), variables),
  CreateDomains: (variables: CreateDomainsMutationVariables) =>
    gqlRequest(CreateDomainsDocument.toString(), variables),
  UpdateDomains: (variables: UpdateDomainsMutationVariables) =>
    gqlRequest(UpdateDomainsDocument.toString(), variables),
  DeleteDomains: (variables: DeleteDomainsMutationVariables) =>
    gqlRequest(DeleteDomainsDocument.toString(), variables),
})
