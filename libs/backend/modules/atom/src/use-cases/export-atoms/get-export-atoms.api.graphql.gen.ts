import * as Types from '@codelab/shared/codegen/graphql';

import { TypeGraphFragment } from '../../../../../../frontend/modules/type/src/graphql/TypeGraph.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TypeGraphFragmentDoc } from '../../../../../../frontend/modules/type/src/graphql/TypeGraph.fragment.graphql.gen';
export type TestGetExportAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>;
}>;


export type TestGetExportAtomsQuery = { getAtoms?: Array<TestGetExport__AtomsFragment> | null | undefined };

export type TestGetExport__AtomsFragment = { id: string, name: string, type: Types.AtomType, api: { id: string, name: string, typeKind: Types.TypeKind, typeGraph: TypeGraphFragment } };

export const TestGetExport__AtomsFragmentDoc = `
    fragment TestGetExport__Atoms on Atom {
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
export const TestGetExportAtomsGql = `
    query TestGetExportAtoms($input: GetAtomsInput) {
  getAtoms(input: $input) {
    ...TestGetExport__Atoms
  }
}
    ${TestGetExport__AtomsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetExportAtoms(variables?: TestGetExportAtomsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetExportAtomsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetExportAtomsQuery>(TestGetExportAtomsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetExportAtoms');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;