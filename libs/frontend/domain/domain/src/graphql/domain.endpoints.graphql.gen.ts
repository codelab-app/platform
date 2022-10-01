import * as Types from '@codelab/shared/abstract/codegen'





import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  DomainFragment,
  DomainFragmentDoc,
} from '../../../../abstract/core/src/domain/domain/domain.fragment.graphql.gen'

export type GetDomainQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.DomainOptions>
  where?: Types.InputMaybe<Types.DomainWhere>
}>

export interface GetDomainQuery {
  domains: Array<DomainFragment>
}

export type CreateDomainMutationVariables = Types.Exact<{
  input: Types.CreateDomainMutationInput
}>

export interface CreateDomainMutation {
  createDomain: DomainFragment
}

export type UpdateDomainMutationVariables = Types.Exact<{
  input: Types.UpdateDomainMutationInput
}>

export interface UpdateDomainMutation {
  updateDomain: DomainFragment
}

export type DeleteDomainMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
}>

export interface DeleteDomainMutation {
  deleteDomain: { nodesDeleted: number }
}

export const GetDomainDocument = gql`
  query GetDomain($options: DomainOptions, $where: DomainWhere) {
    domains(options: $options, where: $where) {
      ...Domain
    }
  }
  ${DomainFragmentDoc}
`
export const CreateDomainDocument = gql`
  mutation CreateDomain($input: CreateDomainMutationInput!) {
    createDomain(input: $input) {
      ...Domain
    }
  }
  ${DomainFragmentDoc}
`
export const UpdateDomainDocument = gql`
  mutation UpdateDomain($input: UpdateDomainMutationInput!) {
    updateDomain(input: $input) {
      ...Domain
    }
  }
  ${DomainFragmentDoc}
`
export const DeleteDomainDocument = gql`
  mutation DeleteDomain($id: String!) {
    deleteDomain(id: $id) {
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
    GetDomain(
      variables?: GetDomainQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetDomainQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetDomainQuery>(GetDomainDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetDomain',
        'query',
      )
    },
    CreateDomain(
      variables: CreateDomainMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateDomainMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateDomainMutation>(
            CreateDomainDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateDomain',
        'mutation',
      )
    },
    UpdateDomain(
      variables: UpdateDomainMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateDomainMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateDomainMutation>(
            UpdateDomainDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateDomain',
        'mutation',
      )
    },
    DeleteDomain(
      variables: DeleteDomainMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteDomainMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteDomainMutation>(
            DeleteDomainDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteDomain',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
