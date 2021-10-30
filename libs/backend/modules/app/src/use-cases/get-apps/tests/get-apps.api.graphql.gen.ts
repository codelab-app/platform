import * as Types from '@codelab/shared/codegen/graphql';

import { TestAppFragment } from '../../../application/app.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestAppFragmentDoc } from '../../../application/app.fragment.graphql.gen';
export type TestGetAppsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetAppsQuery = { apps: Array<TestAppFragment> };


export const TestGetAppsGql = `
    query TestGetApps {
  apps: getApps {
    ...TestApp
  }
}
    ${TestAppFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetApps(variables?: TestGetAppsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetAppsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetAppsQuery>(TestGetAppsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetApps');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;