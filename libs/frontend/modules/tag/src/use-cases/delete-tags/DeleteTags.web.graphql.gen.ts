import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type DeleteTagsMutationVariables = Types.Exact<{
  input: Types.DeleteTagsInput;
}>;


export type DeleteTagsMutation = { deleteTags?: void | null | undefined };


export const DeleteTagsGql = `
    mutation DeleteTags($input: DeleteTagsInput!) {
  deleteTags(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    DeleteTags: build.mutation<DeleteTagsMutation, DeleteTagsMutationVariables>({
      query: (variables) => ({ document: DeleteTagsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useDeleteTagsMutation } = injectedRtkApi;

