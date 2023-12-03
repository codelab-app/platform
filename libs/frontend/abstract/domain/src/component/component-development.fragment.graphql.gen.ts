import * as Types from '@codelab/shared/abstract/codegen'

import { ComponentFragment } from './component.fragment.graphql.gen'
import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { ComponentFragmentDoc } from './component.fragment.graphql.gen'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.graphql.gen'
export type ComponentDevelopmentFragment = {
  elements: Array<ElementFragment>
  rootElement: { id: string }
} & ComponentFragment

export const ComponentDevelopmentFragmentDoc = gql`
  fragment ComponentDevelopment on Component {
    ...Component
    elements {
      ...Element
    }
    rootElement {
      id
    }
  }
  ${ComponentFragmentDoc}
  ${ElementFragmentDoc}
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
