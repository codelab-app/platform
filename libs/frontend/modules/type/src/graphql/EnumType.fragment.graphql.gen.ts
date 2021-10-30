import * as Types from '@codelab/shared/codegen/graphql';

import { EnumTypeValueFragment } from './EnumTypeValue.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.graphql.gen';
export type EnumTypeFragment = { id: string, name: string, allowedValues: Array<EnumTypeValueFragment> };

export const EnumTypeFragmentDoc = `
    fragment EnumType on EnumType {
  id
  name
  allowedValues {
    ...EnumTypeValue
  }
}
    ${EnumTypeValueFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;