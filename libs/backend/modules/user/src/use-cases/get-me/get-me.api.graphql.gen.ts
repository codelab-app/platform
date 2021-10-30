import * as Types from '@codelab/shared/codegen/graphql';

import { __UserFragment } from '../../../../../../frontend/modules/user/src/User.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { __UserFragmentDoc } from '../../../../../../frontend/modules/user/src/User.fragment.graphql.gen';
export type GetMeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: __UserFragment | null | undefined };


export const GetMeGql = `
    query GetMe {
  getMe {
    ...__User
  }
}
    ${__UserFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetMe(variables?: GetMeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeQuery>(GetMeGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMe');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;