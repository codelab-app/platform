import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type UpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput;
}>;


export type UpdateElementPropsMutation = { updateElementProps?: void | null | undefined };


export const UpdateElementPropsGql = `
    mutation UpdateElementProps($input: UpdateElementPropsInput!) {
  updateElementProps(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateElementProps: build.mutation<UpdateElementPropsMutation, UpdateElementPropsMutationVariables>({
      query: (variables) => ({ document: UpdateElementPropsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateElementPropsMutation } = injectedRtkApi;

