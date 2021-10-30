import * as Types from '@codelab/shared/codegen/graphql';

import { TestLambdaFragment } from '../../../domain/lambda.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestLambdaFragmentDoc } from '../../../domain/lambda.fragment.graphql.gen';
export type TestGetLambdasQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetLambdasQuery = { getLambdas: Array<TestLambdaFragment> };


export const TestGetLambdasGql = `
    query TestGetLambdas {
  getLambdas {
    ...TestLambda
  }
}
    ${TestLambdaFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetLambdas(variables?: TestGetLambdasQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetLambdasQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetLambdasQuery>(TestGetLambdasGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetLambdas');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;