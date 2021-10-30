import * as Types from '@codelab/shared/codegen/graphql';

import { AppBaseFragment } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { AppBaseFragmentDoc } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
export type TestCreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput;
}>;


export type TestCreateAppMutation = { createApp: AppBaseFragment };


export const TestCreateAppGql = `
    mutation TestCreateApp($input: CreateAppInput!) {
  createApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateApp(variables: TestCreateAppMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestCreateAppMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateAppMutation>(TestCreateAppGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateApp');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;