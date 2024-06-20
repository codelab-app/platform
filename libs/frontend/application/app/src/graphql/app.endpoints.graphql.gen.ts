import * as Types from '@codelab/shared/abstract/codegen';

import { AppFragment, AppPreviewFragment } from '../../../../abstract/domain/src/app/app.fragment.graphql.gen';
import { AtomDevelopmentFragment, AtomProductionFragment } from '../../../../abstract/domain/src/atom/atom.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { AppFragmentDoc, AppPreviewFragmentDoc } from '../../../../abstract/domain/src/app/app.fragment.graphql.gen';
import { AtomDevelopmentFragmentDoc, AtomProductionFragmentDoc } from '../../../../abstract/domain/src/atom/atom.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CreateAppsMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput;
}>;


export type CreateAppsMutation = { createApps: { apps: Array<{ id: string }> } };

export type UpdateAppsMutationVariables = Types.Exact<{
  where: Types.AppWhere;
  update: Types.AppUpdateInput;
}>;


export type UpdateAppsMutation = { updateApps: { apps: Array<{ id: string }> } };

export type DeleteAppsMutationVariables = Types.Exact<{
  where: Types.AppWhere;
  delete?: Types.InputMaybe<Types.AppDeleteInput>;
}>;


export type DeleteAppsMutation = { deleteApps: { nodesDeleted: number } };

export type GetAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>;
  where?: Types.InputMaybe<Types.AppWhere>;
}>;


export type GetAppsQuery = { aggregate: { count: number }, items: Array<AppFragment> };

export type GetAppsListQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>;
  where?: Types.InputMaybe<Types.AppWhere>;
}>;


export type GetAppsListQuery = { apps: Array<AppPreviewFragment>, atoms: Array<AtomDevelopmentFragment> };


export const CreateAppsDocument = gql`
    mutation CreateApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      id
    }
  }
}
    `;
export const UpdateAppsDocument = gql`
    mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
  updateApps(update: $update, where: $where) {
    apps {
      id
    }
  }
}
    `;
export const DeleteAppsDocument = gql`
    mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
  deleteApps(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `;
export const GetAppsDocument = gql`
    query GetApps($options: AppOptions, $where: AppWhere) {
  aggregate: appsAggregate(where: $where) {
    count
  }
  items: apps(options: $options, where: $where) {
    ...App
  }
}
    ${AppFragmentDoc}`;
export const GetAppsListDocument = gql`
    query GetAppsList($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    ...AppPreview
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomDevelopment
  }
}
    ${AppPreviewFragmentDoc}
${AtomDevelopmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateApps(variables: CreateAppsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateAppsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAppsMutation>(CreateAppsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateApps', 'mutation', variables);
    },
    UpdateApps(variables: UpdateAppsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateAppsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAppsMutation>(UpdateAppsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateApps', 'mutation', variables);
    },
    DeleteApps(variables: DeleteAppsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteAppsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAppsMutation>(DeleteAppsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteApps', 'mutation', variables);
    },
    GetApps(variables?: GetAppsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAppsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAppsQuery>(GetAppsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetApps', 'query', variables);
    },
    GetAppsList(variables?: GetAppsListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAppsListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAppsListQuery>(GetAppsListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAppsList', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;