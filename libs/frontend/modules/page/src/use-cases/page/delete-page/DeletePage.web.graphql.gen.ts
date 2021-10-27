import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../graphql/PageBase.fragment.graphql.gen';
import { PageBaseFragmentDoc } from '../../../graphql/PageBase.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type DeletePageMutationVariables = Types.Exact<{
  input: Types.DeletePageInput;
}>;


export type DeletePageMutation = { deletePage?: PageBaseFragment | null | undefined };


export const DeletePageGql = `
    mutation DeletePage($input: DeletePageInput!) {
  deletePage(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeletePage: build.mutation<DeletePageMutation, DeletePageMutationVariables>({
      query: (variables) => ({ document: DeletePageGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeletePageMutation } = injectedRtkApi;

