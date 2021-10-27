import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type UpdateElementMutationVariables = Types.Exact<{
  input: Types.UpdateElementInput;
}>;


export type UpdateElementMutation = { updateElement?: void | null | undefined };


export const UpdateElementGql = `
    mutation UpdateElement($input: UpdateElementInput!) {
  updateElement(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateElement: build.mutation<UpdateElementMutation, UpdateElementMutationVariables>({
      query: (variables) => ({ document: UpdateElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateElementMutation } = injectedRtkApi;

