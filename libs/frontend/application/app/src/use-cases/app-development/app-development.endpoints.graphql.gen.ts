import * as Types from '@codelab/shared/abstract/codegen'

import { ActionTypeFragment } from '../../../../../abstract/domain/src/type/fragments/action-type.fragment.graphql.gen'
import { AppDevelopmentFragment } from '../../../../../abstract/domain/src/app/app.fragment.graphql.gen'
import { PrimitiveTypeFragment } from '../../../../../abstract/domain/src/type/fragments/primitive-type.fragment.graphql.gen'
import { ReactNodeTypeFragment } from '../../../../../abstract/domain/src/type/fragments/react-node-type.fragment.graphql.gen'
import { RenderPropTypeFragment } from '../../../../../abstract/domain/src/type/fragments/render-prop.fragment.graphql.gen'
import { RichTextTypeFragment } from '../../../../../abstract/domain/src/type/fragments/rich-text-type.fragment.graphql.gen'
import {
  AtomDevelopmentFragment,
  AtomProductionFragment,
} from '../../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'
import { ResourceFragment } from '../../../../../abstract/domain/src/resource/resource.fragment.graphql.gen'
import { AuthGuardFragment } from '../../../../../abstract/domain/src/auth-guard/auth-guard.fragment.graphql.gen'
import { ComponentDevelopmentFragment } from '../../../../../abstract/domain/src/component/component-development.fragment.graphql.gen'
import { RedirectFragment } from '../../../../../abstract/domain/src/redirect/redirect.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { ActionTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/action-type.fragment.graphql.gen'
import { AppDevelopmentFragmentDoc } from '../../../../../abstract/domain/src/app/app.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/primitive-type.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/react-node-type.fragment.graphql.gen'
import { RenderPropTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/render-prop.fragment.graphql.gen'
import { RichTextTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/rich-text-type.fragment.graphql.gen'
import {
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
} from '../../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../../../../abstract/domain/src/resource/resource.fragment.graphql.gen'
import { AuthGuardFragmentDoc } from '../../../../../abstract/domain/src/auth-guard/auth-guard.fragment.graphql.gen'
import { ComponentDevelopmentFragmentDoc } from '../../../../../abstract/domain/src/component/component-development.fragment.graphql.gen'
import { RedirectFragmentDoc } from '../../../../../abstract/domain/src/redirect/redirect.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetAppDevelopmentQueryVariables = Types.Exact<{
  appCompositeKey: Types.Scalars['String']['input']
  pageName: Types.Scalars['String']['input']
}>

export type GetAppDevelopmentQuery = {
  actionTypes: Array<ActionTypeFragment>
  apps: Array<AppDevelopmentFragment>
  atoms: Array<AtomDevelopmentFragment>
  authGuards: Array<AuthGuardFragment>
  components: Array<ComponentDevelopmentFragment>
  primitiveTypes: Array<PrimitiveTypeFragment>
  reactNodeTypes: Array<ReactNodeTypeFragment>
  redirects: Array<RedirectFragment>
  renderPropTypes: Array<RenderPropTypeFragment>
  resources: Array<ResourceFragment>
  richTextTypes: Array<RichTextTypeFragment>
}

export const GetAppDevelopmentDocument = gql`
  query GetAppDevelopment($appCompositeKey: String!, $pageName: String!) {
    actionTypes {
      ...ActionType
    }
    apps(where: { compositeKey: $appCompositeKey }) {
      ...AppDevelopment
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
    authGuards {
      ...AuthGuard
    }
    components {
      ...ComponentDevelopment
    }
    primitiveTypes {
      ...PrimitiveType
    }
    reactNodeTypes {
      ...ReactNodeType
    }
    redirects(where: { source: { app: { compositeKey: $appCompositeKey } } }) {
      ...Redirect
    }
    renderPropTypes {
      ...RenderPropType
    }
    resources {
      ...Resource
    }
    richTextTypes {
      ...RichTextType
    }
  }
  ${ActionTypeFragmentDoc}
  ${AppDevelopmentFragmentDoc}
  ${AtomDevelopmentFragmentDoc}
  ${AuthGuardFragmentDoc}
  ${ComponentDevelopmentFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ReactNodeTypeFragmentDoc}
  ${RedirectFragmentDoc}
  ${RenderPropTypeFragmentDoc}
  ${ResourceFragmentDoc}
  ${RichTextTypeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
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
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
