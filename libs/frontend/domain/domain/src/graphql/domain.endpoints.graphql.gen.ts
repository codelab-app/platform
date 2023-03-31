import * as Types from '@codelab/shared/abstract/codegen'

import { DomainFragment } from '../../../../abstract/core/src/domain/domain/domain.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { DomainFragmentDoc } from '../../../../abstract/core/src/domain/domain/domain.fragment.graphql.gen'
export type GetDomainsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.DomainOptions>
  where?: Types.InputMaybe<Types.DomainWhere>
}>

export type GetDomainsQuery = { domains: Array<DomainFragment> }

export type CreateDomainsMutationVariables = Types.Exact<{
  input: Array<Types.DomainCreateInput> | Types.DomainCreateInput
}>

export type CreateDomainsMutation = {
  createDomains: { domains: Array<{ id: string }> }
}

export type UpdateDomainsMutationVariables = Types.Exact<{
  where: Types.DomainWhere
  update: Types.DomainUpdateInput
}>

export type UpdateDomainsMutation = {
  updateDomains: { domains: Array<{ id: string }> }
}

export type DeleteDomainsMutationVariables = Types.Exact<{
  where: Types.DomainWhere
}>

export type DeleteDomainsMutation = { deleteDomains: { nodesDeleted: number } }

export const GetDomainsDocument = gql`
  query GetDomains($options: DomainOptions, $where: DomainWhere) {
    domains(options: $options, where: $where) {
      ...Domain
    }
  }
  ${DomainFragmentDoc}
`
export const CreateDomainsDocument = gql`
  mutation CreateDomains($input: [DomainCreateInput!]!) {
    createDomains(input: $input) {
      domains {
        id
      }
    }
  }
`
export const UpdateDomainsDocument = gql`
  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
    updateDomains(where: $where, update: $update) {
      domains {
        id
      }
    }
  }
`
export const DeleteDomainsDocument = gql`
  mutation DeleteDomains($where: DomainWhere!) {
    deleteDomains(where: $where) {
      nodesDeleted
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetDomains(
      variables?: GetDomainsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetDomainsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetDomainsQuery>(GetDomainsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetDomains',
        'query',
      )
    },
    CreateDomains(
      variables: CreateDomainsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateDomainsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateDomainsMutation>(
            CreateDomainsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateDomains',
        'mutation',
      )
    },
    UpdateDomains(
      variables: UpdateDomainsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateDomainsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateDomainsMutation>(
            UpdateDomainsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateDomains',
        'mutation',
      )
    },
    DeleteDomains(
      variables: DeleteDomainsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteDomainsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteDomainsMutation>(
            DeleteDomainsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteDomains',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
