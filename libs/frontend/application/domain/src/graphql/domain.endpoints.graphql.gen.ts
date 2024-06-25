import * as Types from '@codelab/shared/abstract/codegen'

import { DomainFragment } from '../../../../abstract/domain/src/domain/domain.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { DomainFragmentDoc } from '../../../../abstract/domain/src/domain/domain.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetDomainsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.DomainOptions>
  where?: Types.InputMaybe<Types.DomainWhere>
}>

export type GetDomainsQuery = {
  aggregate: { count: number }
  items: Array<DomainFragment>
}

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
    aggregate: domainsAggregate(where: $where) {
      count
    }
    items: domains(options: $options, where: $where) {
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
    updateDomains(update: $update, where: $where) {
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
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetDomains(
      variables?: GetDomainsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetDomainsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetDomainsQuery>(GetDomainsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetDomains',
        'query',
        variables,
      )
    },
    CreateDomains(
      variables: CreateDomainsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
        variables,
      )
    },
    UpdateDomains(
      variables: UpdateDomainsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
        variables,
      )
    },
    DeleteDomains(
      variables: DeleteDomainsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
