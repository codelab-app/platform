import * as Types from '@codelab/shared/abstract/codegen'

import {
  PropFragment,
} from '../prop/prop.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PropFragmentDoc,
} from '../prop/prop.fragment.graphql.gen'
export type ComponentFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null }
  owner: { id: string; auth0Id: string }
  api: { id: string; name: string }
  props?: PropFragment | null
}

export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    id
    name
    rootElement {
      id
      name
    }
    owner {
      id
      auth0Id
    }
    api {
      id
      name
    }
    props {
      ...Prop
    }
  }
  ${PropFragmentDoc}
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
