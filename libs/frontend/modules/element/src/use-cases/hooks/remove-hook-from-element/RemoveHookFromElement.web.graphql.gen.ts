import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type RemoveHookFromElementMutationVariables = Types.Exact<{
  input: Types.RemoveHookFromElementInput;
}>;


export type RemoveHookFromElementMutation = { removeHookFromElement?: void | null | undefined };


export const RemoveHookFromElementGql = `
    mutation RemoveHookFromElement($input: RemoveHookFromElementInput!) {
  removeHookFromElement(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    RemoveHookFromElement: build.mutation<RemoveHookFromElementMutation, RemoveHookFromElementMutationVariables>({
      query: (variables) => ({ document: RemoveHookFromElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useRemoveHookFromElementMutation } = injectedRtkApi;

