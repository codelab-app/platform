import * as Types from '@codelab/shared/codegen/graphql';

import { AppBaseFragment } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { AppBaseFragmentDoc } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
export type TestDeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput;
}>;


export type TestDeleteAppMutation = { deleteApp?: AppBaseFragment | null | undefined };


export const TestDeleteAppGql = `
    mutation TestDeleteApp($input: DeleteAppInput!) {
  deleteApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteApp(variables: TestDeleteAppMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteAppMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteAppMutation>(TestDeleteAppGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteApp');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;