import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../graphql/PageBase.fragment.graphql.gen';
import { PageBaseFragmentDoc } from '../../../graphql/PageBase.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type CreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput;
}>;


export type CreatePageMutation = { createPage: PageBaseFragment };


export const CreatePageGql = `
    mutation CreatePage($input: CreatePageInput!) {
  createPage(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreatePage: build.mutation<CreatePageMutation, CreatePageMutationVariables>({
      query: (variables) => ({ document: CreatePageGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreatePageMutation } = injectedRtkApi;

