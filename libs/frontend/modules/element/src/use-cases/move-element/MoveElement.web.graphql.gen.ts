import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/shared/codegen/graphql';
export type MoveElementMutationVariables = Types.Exact<{
  input: Types.MoveElementInput;
}>;


export type MoveElementMutation = { moveElement?: void | null | undefined };


export const MoveElementGql = `
    mutation MoveElement($input: MoveElementInput!) {
  moveElement(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    MoveElement: build.mutation<MoveElementMutation, MoveElementMutationVariables>({
      query: (variables) => ({ document: MoveElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useMoveElementMutation } = injectedRtkApi;

