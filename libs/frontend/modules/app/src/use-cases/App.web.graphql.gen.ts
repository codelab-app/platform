import * as Types from '@codelab/shared/codegen/graphql';

import { AppFragment, AppBaseFragment } from '../App.fragment.graphql.gen';
import { AppFragmentDoc, AppBaseFragmentDoc } from '../App.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetAppsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAppsQuery = { apps: Array<AppFragment> };

export type GetAppQueryVariables = Types.Exact<{
  input: Types.GetAppInput;
}>;


export type GetAppQuery = { app?: AppFragment | null | undefined };

export type CreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput;
}>;


export type CreateAppMutation = { createApp: AppBaseFragment };

export type DeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput;
}>;


export type DeleteAppMutation = { deleteApp?: AppBaseFragment | null | undefined };

export type UpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput;
}>;


export type UpdateAppMutation = { updateApp?: AppBaseFragment | null | undefined };


export const GetAppsGql = `
    query GetApps {
  apps: getApps {
    ...App
  }
}
    ${AppFragmentDoc}`;
export const GetAppGql = `
    query GetApp($input: GetAppInput!) {
  app: getApp(input: $input) {
    ...App
  }
}
    ${AppFragmentDoc}`;
export const CreateAppGql = `
    mutation CreateApp($input: CreateAppInput!) {
  createApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;
export const DeleteAppGql = `
    mutation DeleteApp($input: DeleteAppInput!) {
  deleteApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;
export const UpdateAppGql = `
    mutation UpdateApp($input: UpdateAppInput!) {
  updateApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetApps: build.query<GetAppsQuery, GetAppsQueryVariables | void>({
      query: (variables) => ({ document: GetAppsGql, variables })
    }),
    GetApp: build.query<GetAppQuery, GetAppQueryVariables>({
      query: (variables) => ({ document: GetAppGql, variables })
    }),
    CreateApp: build.mutation<CreateAppMutation, CreateAppMutationVariables>({
      query: (variables) => ({ document: CreateAppGql, variables })
    }),
    DeleteApp: build.mutation<DeleteAppMutation, DeleteAppMutationVariables>({
      query: (variables) => ({ document: DeleteAppGql, variables })
    }),
    UpdateApp: build.mutation<UpdateAppMutation, UpdateAppMutationVariables>({
      query: (variables) => ({ document: UpdateAppGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAppsQuery, useLazyGetAppsQuery, useGetAppQuery, useLazyGetAppQuery, useCreateAppMutation, useDeleteAppMutation, useUpdateAppMutation } = injectedRtkApi;

