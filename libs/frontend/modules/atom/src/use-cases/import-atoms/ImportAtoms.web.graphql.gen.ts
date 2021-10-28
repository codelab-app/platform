import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type ImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput;
}>;


export type ImportAtomsMutation = { importAtoms?: void | null | undefined };


export const ImportAtomsGql = `
    mutation ImportAtoms($input: ImportAtomsInput!) {
  importAtoms(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ImportAtoms: build.mutation<ImportAtomsMutation, ImportAtomsMutationVariables>({
      query: (variables) => ({ document: ImportAtomsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useImportAtomsMutation } = injectedRtkApi;

