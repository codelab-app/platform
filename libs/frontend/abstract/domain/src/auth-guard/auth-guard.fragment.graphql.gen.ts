import * as Types from '@codelab/shared/abstract/codegen';

import { PropFragment } from '../prop/prop.fragment.graphql.gen';
import { ResourceFragment } from '../resource/resource.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen';
import { ResourceFragmentDoc } from '../resource/resource.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type AuthGuardFragment = { id: string, name: string, responseTransformer: string, config: PropFragment, resource: ResourceFragment };

export const AuthGuardFragmentDoc = gql`
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
}
    ${PropFragmentDoc}
${ResourceFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;