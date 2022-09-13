import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
export type AtomFragment = { icon?: string | null, id: string, name: string, type: Types.AtomType, tags: Array<{ id: string, name: string }>, api: { id: string, name: string } };

export const AtomFragmentDoc = gql`
    fragment Atom on Atom {
  icon
  id
  name
  type
  tags {
    id
    name
  }
  api {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;