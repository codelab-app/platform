import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type ImportTagsMutationVariables = Types.Exact<{
  input: Types.ImportTagsInput;
}>;


export type ImportTagsMutation = { importTags?: void | null | undefined };


export const ImportTagsGql = `
    mutation ImportTags($input: ImportTagsInput!) {
  importTags(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ImportTags: build.mutation<ImportTagsMutation, ImportTagsMutationVariables>({
      query: (variables) => ({ document: ImportTagsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useImportTagsMutation } = injectedRtkApi;

