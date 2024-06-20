import * as Types from '@codelab/shared/abstract/codegen';

import { StoreFragment } from '../../../../abstract/domain/src/store/store.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { StoreFragmentDoc } from '../../../../abstract/domain/src/store/store.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CreateStoresMutationVariables = Types.Exact<{
  input: Array<Types.StoreCreateInput> | Types.StoreCreateInput;
}>;


export type CreateStoresMutation = { createStores: { info: { nodesCreated: number, relationshipsCreated: number }, stores: Array<{ id: string }> } };

export type DeleteStoresMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>;
  delete?: Types.InputMaybe<Types.StoreDeleteInput>;
}>;


export type DeleteStoresMutation = { deleteStores: { nodesDeleted: number } };

export type GetStoresQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>;
  options?: Types.InputMaybe<Types.StoreOptions>;
}>;


export type GetStoresQuery = { aggregate: { count: number }, items: Array<StoreFragment> };

export type UpdateStoresMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>;
  update?: Types.InputMaybe<Types.StoreUpdateInput>;
}>;


export type UpdateStoresMutation = { updateStores: { stores: Array<{ id: string }> } };


export const CreateStoresDocument = gql`
    mutation CreateStores($input: [StoreCreateInput!]!) {
  createStores(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    stores {
      id
    }
  }
}
    `;
export const DeleteStoresDocument = gql`
    mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
  deleteStores(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `;
export const GetStoresDocument = gql`
    query GetStores($where: StoreWhere, $options: StoreOptions) {
  aggregate: storesAggregate(where: $where) {
    count
  }
  items: stores(options: $options, where: $where) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const UpdateStoresDocument = gql`
    mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
  updateStores(update: $update, where: $where) {
    stores {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateStores(variables: CreateStoresMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateStoresMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateStoresMutation>(CreateStoresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateStores', 'mutation', variables);
    },
    DeleteStores(variables?: DeleteStoresMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteStoresMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteStoresMutation>(DeleteStoresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteStores', 'mutation', variables);
    },
    GetStores(variables?: GetStoresQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetStoresQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStoresQuery>(GetStoresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStores', 'query', variables);
    },
    UpdateStores(variables?: UpdateStoresMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateStoresMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateStoresMutation>(UpdateStoresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateStores', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;