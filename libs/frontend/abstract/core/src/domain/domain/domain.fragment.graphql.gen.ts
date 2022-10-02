import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type DomainFragment = {
  id: string
  name: string
  app: { id: string }
  domainConfig: { misconfigured: boolean }
  projectDomain: { verified: boolean }
}

export const DomainFragmentDoc = gql`
  fragment Domain on Domain {
    id
    name
    app {
      id
    }
    domainConfig {
      misconfigured
    }
    projectDomain {
      verified
    }
  }
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
