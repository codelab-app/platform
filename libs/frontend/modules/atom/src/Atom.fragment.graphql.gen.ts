import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type AtomFragment = { __typename: 'Atom', id: string, name: string, type: Types.AtomType, api: { __typename: 'InterfaceType', id: string, name: string } };

export type AtomBaseFragment = { id: string, name: string, type: Types.AtomType, api: { id: string, name: string } };

export const AtomFragmentDoc = `
    fragment Atom on Atom {
  __typename
  id
  name
  type
  api {
    __typename
    id
    name
  }
}
    `;
export const AtomBaseFragmentDoc = `
    fragment AtomBase on Atom {
  id
  name
  type
  api {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;