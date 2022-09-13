import * as Types from '@codelab/shared/abstract/codegen';

import { ActionBase_CustomAction_Fragment, ActionBase_PipelineAction_Fragment, ActionBase_ResourceAction_Fragment } from './action-base.fragment.graphql.gen';
import { CustomActionFragment } from './custom-action.fragment.graphql.gen';
import { ResourceActionFragment } from './resource-action.fragment.graphql.gen';
import { PipelineActionFragment } from './pipeline-action.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen';
import { CustomActionFragmentDoc } from './custom-action.fragment.graphql.gen';
import { ResourceActionFragmentDoc } from './resource-action.fragment.graphql.gen';
import { PipelineActionFragmentDoc } from './pipeline-action.fragment.graphql.gen';
export type Action_CustomAction_Fragment = (
  CustomActionFragment
  & ActionBase_CustomAction_Fragment
);

export type Action_PipelineAction_Fragment = (
  PipelineActionFragment
  & ActionBase_PipelineAction_Fragment
);

export type Action_ResourceAction_Fragment = (
  ResourceActionFragment
  & ActionBase_ResourceAction_Fragment
);

export type ActionFragment = Action_CustomAction_Fragment | Action_PipelineAction_Fragment | Action_ResourceAction_Fragment;

export const ActionFragmentDoc = gql`
    fragment Action on ActionBase {
  ...ActionBase
  ... on CustomAction {
    ...CustomAction
  }
  ... on ResourceAction {
    ...ResourceAction
  }
  ... on PipelineAction {
    ...PipelineAction
  }
}
    ${ActionBaseFragmentDoc}
${CustomActionFragmentDoc}
${ResourceActionFragmentDoc}
${PipelineActionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;