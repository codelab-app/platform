import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type ResetDataMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ResetDataMutation = { resetData?: void | null | undefined };


export const ResetDataGql = `
    mutation ResetData {
  resetData
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ResetData: build.mutation<ResetDataMutation, ResetDataMutationVariables | void>({
      query: (variables) => ({ document: ResetDataGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useResetDataMutation } = injectedRtkApi;

