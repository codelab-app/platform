import * as Types from '@codelab/shared/codegen/graphql';

import { AppBaseFragment } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { AppBaseFragmentDoc } from '../../../../../../../frontend/modules/app/src/App.fragment.graphql.gen';
export type TestUpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput;
}>;


export type TestUpdateAppMutation = { updateApp?: AppBaseFragment | null | undefined };


export const TestUpdateAppGql = `
    mutation TestUpdateApp($input: UpdateAppInput!) {
  updateApp(input: $input) {
    ...AppBase
  }
}
    ${AppBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdateApp(variables: TestUpdateAppMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdateAppMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateAppMutation>(TestUpdateAppGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateApp');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;