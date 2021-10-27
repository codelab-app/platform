import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type CreateElementMutationVariables = Types.Exact<{
  input: Types.CreateElementInput;
}>;


export type CreateElementMutation = { createElement: { id: string } };


export const CreateElementGql = `
    mutation CreateElement($input: CreateElementInput!) {
  createElement(input: $input) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateElement: build.mutation<CreateElementMutation, CreateElementMutationVariables>({
      query: (variables) => ({ document: CreateElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateElementMutation } = injectedRtkApi;

