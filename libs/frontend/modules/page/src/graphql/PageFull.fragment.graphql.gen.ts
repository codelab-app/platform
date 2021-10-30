import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from './PageBase.fragment.graphql.gen';
import { ElementGraphFragment } from '../../../element/src/graphql/ElementGraph.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { PageBaseFragmentDoc } from './PageBase.fragment.graphql.gen';
import { ElementGraphFragmentDoc } from '../../../element/src/graphql/ElementGraph.fragment.graphql.gen';
export type PageFullFragment = (
  { elements?: ElementGraphFragment | null | undefined }
  & PageBaseFragment
);

export const PageFullFragmentDoc = `
    fragment PageFull on Page {
  ...PageBase
  elements {
    ...ElementGraph
  }
}
    ${PageBaseFragmentDoc}
${ElementGraphFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;