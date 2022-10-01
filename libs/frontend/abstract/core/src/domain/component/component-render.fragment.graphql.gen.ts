import * as Types from '@codelab/shared/abstract/codegen'






import { ComponentFragment } from './component.fragment.graphql.gen'
import { ElementFragment } from '../element/element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ComponentFragmentDoc } from './component.fragment.graphql.gen'
import { ElementFragmentDoc } from '../element/element.fragment.graphql.gen'
export type RenderedComponentFragment = {
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
} & ComponentFragment

export const RenderedComponentFragmentDoc = gql`
  fragment RenderedComponent on Component {
    ...Component
    rootElement {
      ...Element
      descendantElements {
        ...Element
      }
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
