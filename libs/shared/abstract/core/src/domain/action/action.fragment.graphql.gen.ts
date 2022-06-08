import * as Types from '@codelab/shared/abstract/codegen'

import { ResourceFragment } from '../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ResourceFragmentDoc } from '../resource/resource.fragment.graphql.gen'
export type Action_CustomAction_Fragment = ActionBase_CustomAction_Fragment &
  CustomActionFragment

export type Action_PipelineAction_Fragment =
  ActionBase_PipelineAction_Fragment & PipelineActionFragment

export type Action_ResourceAction_Fragment =
  ActionBase_ResourceAction_Fragment & ResourceActionFragment

export type ActionFragment =
  | Action_CustomAction_Fragment
  | Action_PipelineAction_Fragment
  | Action_ResourceAction_Fragment

export type ActionBase_CustomAction_Fragment = {
  id: string
  name: string
  runOnInit: boolean
  store: { id: string; name: string }
}

export type ActionBase_PipelineAction_Fragment = {
  id: string
  name: string
  runOnInit: boolean
  store: { id: string; name: string }
}

export type ActionBase_ResourceAction_Fragment = {
  id: string
  name: string
  runOnInit: boolean
  store: { id: string; name: string }
}

export type ActionBaseFragment =
  | ActionBase_CustomAction_Fragment
  | ActionBase_PipelineAction_Fragment
  | ActionBase_ResourceAction_Fragment

export type CustomActionFragment = {
  code: string
} & ActionBase_CustomAction_Fragment

export type ResourceActionFragment = {
  success:
    | ActionBase_CustomAction_Fragment
    | ActionBase_PipelineAction_Fragment
    | ActionBase_ResourceAction_Fragment
  error:
    | ActionBase_CustomAction_Fragment
    | ActionBase_PipelineAction_Fragment
    | ActionBase_ResourceAction_Fragment
  resource: ResourceFragment
  config: { id: string; data: string }
} & ActionBase_ResourceAction_Fragment

export type PipelineActionFragment = {
  actions: Array<
    | ActionBase_CustomAction_Fragment
    | ActionBase_PipelineAction_Fragment
    | ActionBase_ResourceAction_Fragment
  >
} & ActionBase_PipelineAction_Fragment

export const ActionBaseFragmentDoc = gql`
  fragment ActionBase on ActionBase {
    id
    name
    store {
      id
      name
    }
    runOnInit
  }
`
export const CustomActionFragmentDoc = gql`
  fragment CustomAction on CustomAction {
    ...ActionBase
    code
  }
  ${ActionBaseFragmentDoc}
`
export const ResourceActionFragmentDoc = gql`
  fragment ResourceAction on ResourceAction {
    ...ActionBase
    success {
      ...ActionBase
    }
    error {
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
export const PipelineActionFragmentDoc = gql`
  fragment PipelineAction on PipelineAction {
    ...ActionBase
    actions {
      ...ActionBase
    }
  }
  ${ActionBaseFragmentDoc}
`
export const ActionFragmentDoc = gql`
  fragment Action on ActionBase {
    ...ActionBase
    ...CustomAction
    ...ResourceAction
    ...PipelineAction
  }
  ${ActionBaseFragmentDoc}
  ${CustomActionFragmentDoc}
  ${ResourceActionFragmentDoc}
  ${PipelineActionFragmentDoc}
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
