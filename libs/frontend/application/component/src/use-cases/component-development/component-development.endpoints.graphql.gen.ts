import * as Types from '@codelab/shared/abstract/codegen'

import { ActionTypeFragment } from '../../../../../abstract/domain/src/type/fragments/action-type.fragment.graphql.gen'
import {
  AtomDevelopmentFragment,
  AtomProductionFragment,
} from '../../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'
import { CodeMirrorTypeFragment } from '../../../../../abstract/domain/src/type/fragments/code-mirror-type.fragment.graphql.gen'
import { ComponentDevelopmentFragment } from '../../../../../abstract/domain/src/component/component-development.fragment.graphql.gen'
import { ResourceFragment } from '../../../../../abstract/domain/src/resource/resource.fragment.graphql.gen'
import { PrimitiveTypeFragment } from '../../../../../abstract/domain/src/type/fragments/primitive-type.fragment.graphql.gen'
import { ReactNodeTypeFragment } from '../../../../../abstract/domain/src/type/fragments/react-node-type.fragment.graphql.gen'
import { RenderPropTypeFragment } from '../../../../../abstract/domain/src/type/fragments/render-prop.fragment.graphql.gen'
import { RichTextTypeFragment } from '../../../../../abstract/domain/src/type/fragments/rich-text-type.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { ActionTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/action-type.fragment.graphql.gen'
import {
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
} from '../../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'
import { CodeMirrorTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/code-mirror-type.fragment.graphql.gen'
import { ComponentDevelopmentFragmentDoc } from '../../../../../abstract/domain/src/component/component-development.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../../../../abstract/domain/src/resource/resource.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/primitive-type.fragment.graphql.gen'
import { ReactNodeTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/react-node-type.fragment.graphql.gen'
import { RenderPropTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/render-prop.fragment.graphql.gen'
import { RichTextTypeFragmentDoc } from '../../../../../abstract/domain/src/type/fragments/rich-text-type.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetComponentDevelopmentQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetComponentDevelopmentQuery = {
  actionTypes: Array<ActionTypeFragment>
  atoms: Array<AtomDevelopmentFragment>
  codeMirrorTypes: Array<CodeMirrorTypeFragment>
  components: Array<ComponentDevelopmentFragment>
  primitiveTypes: Array<PrimitiveTypeFragment>
  reactNodeTypes: Array<ReactNodeTypeFragment>
  renderPropTypes: Array<RenderPropTypeFragment>
  resources: Array<ResourceFragment>
  richTextTypes: Array<RichTextTypeFragment>
}

export const GetComponentDevelopmentDocument = gql`
  query GetComponentDevelopment {
    actionTypes {
      ...ActionType
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomDevelopment
    }
    codeMirrorTypes {
      ...CodeMirrorType
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
  ${AtomDevelopmentFragmentDoc}
  ${CodeMirrorTypeFragmentDoc}
  ${ComponentDevelopmentFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ReactNodeTypeFragmentDoc}
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
    GetComponentDevelopment(
      variables?: GetComponentDevelopmentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetComponentDevelopmentQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetComponentDevelopmentQuery>(
            GetComponentDevelopmentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetComponentDevelopment',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
