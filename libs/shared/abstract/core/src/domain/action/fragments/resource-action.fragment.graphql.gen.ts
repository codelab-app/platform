import * as Types from '@codelab/shared/abstract/codegen'

import {
  ActionBase_CustomAction_Fragment,
  ActionBase_PipelineAction_Fragment,
  ActionBase_ResourceAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { ResourceFragment } from '../../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../resource/resource.fragment.graphql.gen'
export type ResourceActionFragment = {
  successAction:
    | ActionBase_CustomAction_Fragment
    | ActionBase_PipelineAction_Fragment
    | ActionBase_ResourceAction_Fragment
  errorAction:
    | ActionBase_CustomAction_Fragment
    | ActionBase_PipelineAction_Fragment
    | ActionBase_ResourceAction_Fragment
  resource: ResourceFragment
  config: { id: string; data: string }
} & ActionBase_ResourceAction_Fragment

export const ResourceActionFragmentDoc = gql`
  fragment ResourceAction on ResourceAction {
    ...ActionBase
    successAction {
      ...ActionBase
    }
    errorAction {
      ...ActionBase
    }
    resource {
      ...Resource
    }
    config {
      id
      data
    }
  }
  ${ActionBaseFragmentDoc}
  ${ResourceFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
