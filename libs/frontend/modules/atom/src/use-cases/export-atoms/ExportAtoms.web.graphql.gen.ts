import * as Types from '@codelab/shared/codegen/graphql';

import { TypeGraphFragment } from '../../../../type/src/graphql/TypeGraph.fragment.graphql.gen';
import { TypeGraphFragmentDoc } from '../../../../type/src/graphql/TypeGraph.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type ExportAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>;
}>;


export type ExportAtomsQuery = { getAtoms?: Array<Export__AtomsFragment> | null | undefined };

export type Export__AtomsFragment = { id: string, name: string, type: Types.AtomType, api: { id: string, name: string, typeKind: Types.TypeKind, typeGraph: TypeGraphFragment } };

export const Export__AtomsFragmentDoc = `
    fragment Export__Atoms on Atom {
  id
  name
  type
  api {
    id
    name
    typeKind
    typeGraph {
      ...TypeGraph
    }
  }
}
    ${TypeGraphFragmentDoc}`;
export const ExportAtomsGql = `
    query ExportAtoms($input: GetAtomsInput) {
  getAtoms(input: $input) {
    ...Export__Atoms
  }
}
    ${Export__AtomsFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ExportAtoms: build.query<ExportAtomsQuery, ExportAtomsQueryVariables | void>({
      query: (variables) => ({ document: ExportAtomsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useExportAtomsQuery, useLazyExportAtomsQuery } = injectedRtkApi;

