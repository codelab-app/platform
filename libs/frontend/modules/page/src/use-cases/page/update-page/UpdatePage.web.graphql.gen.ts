import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../graphql/PageBase.fragment.graphql.gen';
import { PageBaseFragmentDoc } from '../../../graphql/PageBase.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type UpdatePageMutationVariables = Types.Exact<{
  input: Types.UpdatePageInput;
}>;


export type UpdatePageMutation = { updatePage?: PageBaseFragment | null | undefined };


export const UpdatePageGql = `
    mutation UpdatePage($input: UpdatePageInput!) {
  updatePage(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdatePage: build.mutation<UpdatePageMutation, UpdatePageMutationVariables>({
      query: (variables) => ({ document: UpdatePageGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdatePageMutation } = injectedRtkApi;

