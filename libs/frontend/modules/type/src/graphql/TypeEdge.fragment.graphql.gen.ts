import * as Types from '@codelab/shared/codegen/graphql';

import { FieldFragment } from './Field.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { FieldFragmentDoc } from './Field.fragment.graphql.gen';
export type TypeEdgeFragment = { source: string, target: string, kind: Types.TypeEdgeKind, field?: FieldFragment | null | undefined };

export const TypeEdgeFragmentDoc = `
    fragment TypeEdge on TypeEdge {
  source
  target
  kind
  field {
    ...Field
  }
}
    ${FieldFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;