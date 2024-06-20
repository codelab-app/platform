import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type UserFragment = { auth0Id: string, email: string, id: string, preferences?: string | null, roles?: Array<Types.Role> | null, username: string, apps: Array<{ id: string }> };

export const UserFragmentDoc = gql`
    fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences
  roles
  username
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;