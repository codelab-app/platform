import * as Types from '@codelab/shared/abstract/codegen'

import {
  ActionBase_CustomAction_Fragment,
  ActionBase_PipelineAction_Fragment,
  ActionBase_ResourceAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen'
export type PipelineActionFragment = {
  actions: Array<{ id: string } | { id: string } | { id: string }>
  actionsConnection: {
    edges: Array<{
      orders?: Array<string> | null
      node: { id: string } | { id: string } | { id: string }
    }>
  }
} & ActionBase_PipelineAction_Fragment

export const PipelineActionFragmentDoc = gql`
  fragment PipelineAction on PipelineAction {
    ...ActionBase
    actions {
      ... on CustomAction {
        id
      }
      ... on ResourceAction {
        id
      }
      ... on PipelineAction {
        id
      }
    }
    actionsConnection {
      edges {
        orders
        node {
          ... on CustomAction {
            id
          }
          ... on ResourceAction {
            id
          }
          ... on PipelineAction {
            id
          }
        }
      }
    }
  }
  ${ActionBaseFragmentDoc}
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
