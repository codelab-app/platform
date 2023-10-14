import * as Types from '@codelab/shared/abstract/codegen'

import { AppDevelopmentFragment } from '../../../../../abstract/domain/src/domain/app/app.fragment.graphql.gen'
import {
  AtomDevelopmentFragment,
  AtomProductionFragment,
} from '../../../../../abstract/domain/src/domain/atom/atom.fragment.graphql.gen'
import { ResourceFragment } from '../../../../../abstract/domain/src/domain/resource/resource.fragment.graphql.gen'
import { PrimitiveTypeFragment } from '../../../../../abstract/domain/src/domain/type/fragments/primitive-type.fragment.graphql.gen'
import { ReactNodeTypeFragment } from '../../../../../abstract/domain/src/domain/type/fragments/react-node-type.fragment.graphql.gen'
import { RenderPropTypeFragment } from '../../../../../abstract/domain/src/domain/type/fragments/render-prop.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { AppDevelopmentFragmentDoc } from '../../../../../abstract/domain/src/domain/app/app.fragment.graphql.gen'
import {
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
} from '../../../../../abstract/domain/src/domain/atom/atom.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../../../../abstract/domain/src/domain/resource/resource.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from '../../../../../abstract/domain/src/domain/type/fragments/primitive-type.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from '../../../../../abstract/domain/src/domain/type/fragments/react-node-type.fragment.graphql.gen'
import { RenderPropTypeFragmentDoc } from '../../../../../abstract/domain/src/domain/type/fragments/render-prop.fragment.graphql.gen'
export type GetAppDevelopmentQueryVariables = Types.Exact<{
  appCompositeKey: Types.Scalars['String']['input']
  pageName: Types.Scalars['String']['input']
}>

export type GetAppDevelopmentQuery = {
  apps: Array<AppDevelopmentFragment>
  atoms: Array<AtomDevelopmentFragment>
  resources: Array<ResourceFragment>
  primitiveTypes: Array<PrimitiveTypeFragment>
  reactNodeTypes: Array<ReactNodeTypeFragment>
  renderPropTypes: Array<RenderPropTypeFragment>
}

export const GetAppDevelopmentDocument = gql`
  query GetAppDevelopment($appCompositeKey: String!, $pageName: String!) {
    apps(where: { compositeKey: $appCompositeKey }) {
      ...AppDevelopment
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
    resources {
      ...Resource
    }
    primitiveTypes {
      ...PrimitiveType
    }
    reactNodeTypes {
      ...ReactNodeType
    }
    renderPropTypes {
      ...RenderPropType
    }
  }
  ${AppDevelopmentFragmentDoc}
  ${AtomDevelopmentFragmentDoc}
  ${ResourceFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ReactNodeTypeFragmentDoc}
  ${RenderPropTypeFragmentDoc}
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
  return {
    GetAppDevelopment(
      variables: GetAppDevelopmentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetAppDevelopmentQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppDevelopmentQuery>(
            GetAppDevelopmentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetAppDevelopment',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>