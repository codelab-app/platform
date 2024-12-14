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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  DomainList: (variables: DomainListQueryVariables) =>
    gqlRequest(client, DomainListDocument.toString(), variables),
  CreateDomains: (variables: CreateDomainsMutationVariables) =>
    gqlRequest(client, CreateDomainsDocument.toString(), variables),
  UpdateDomains: (variables: UpdateDomainsMutationVariables) =>
    gqlRequest(client, UpdateDomainsDocument.toString(), variables),
  DeleteDomains: (variables: DeleteDomainsMutationVariables) =>
    gqlRequest(client, DeleteDomainsDocument.toString(), variables),
})
