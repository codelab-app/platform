import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type AddHookToElementMutationVariables = Types.Exact<{
  input: Types.AddHookToElementInput;
}>;


export type AddHookToElementMutation = { addHookToElement: { id: string } };


export const AddHookToElementGql = `
    mutation AddHookToElement($input: AddHookToElementInput!) {
  addHookToElement(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    AddHookToElement: build.mutation<AddHookToElementMutation, AddHookToElementMutationVariables>({
      query: (variables) => ({ document: AddHookToElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddHookToElementMutation } = injectedRtkApi;

