import * as Types from '@codelab/shared/abstract/codegen'

import { PageBuilderAppFragment } from '../../../../../shared/abstract/core/src/domain/app/app.fragment.graphql.gen'
import { ComponentFragment } from '../../../../../shared/abstract/core/src/domain/component/component.fragment.graphql.gen'
import { StoreFragment } from '../../../../../shared/abstract/core/src/domain/store/store.fragment.graphql.gen'
import {
  Type_ActionType_Fragment,
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_CodeMirrorType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
} from '../../../../../shared/abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { PageBuilderAppFragmentDoc } from '../../../../../shared/abstract/core/src/domain/app/app.fragment.graphql.gen'
import { ComponentFragmentDoc } from '../../../../../shared/abstract/core/src/domain/component/component.fragment.graphql.gen'
import { StoreFragmentDoc } from '../../../../../shared/abstract/core/src/domain/store/store.fragment.graphql.gen'
import { TypeFragmentDoc } from '../../../../../shared/abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'
export type GetPageBuilderQueryVariables = Types.Exact<{
  appId: Types.Scalars['ID']
  pageId: Types.Scalars['ID']
  typeIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetPageBuilderQuery = {
  apps: Array<PageBuilderAppFragment>
  stores: Array<StoreFragment>
  components: Array<ComponentFragment>
  primitiveTypes: Array<Type_PrimitiveType_Fragment>
  arrayTypes: Array<Type_ArrayType_Fragment>
  unionTypes: Array<Type_UnionType_Fragment>
  interfaceTypes: Array<Type_InterfaceType_Fragment>
  elementTypes: Array<Type_ElementType_Fragment>
  renderPropsTypes: Array<Type_RenderPropsType_Fragment>
  reactNodeTypes: Array<Type_ReactNodeType_Fragment>
  enumTypes: Array<Type_EnumType_Fragment>
  lambdaTypes: Array<Type_LambdaType_Fragment>
  pageTypes: Array<Type_PageType_Fragment>
  appTypes: Array<Type_AppType_Fragment>
  actionTypes: Array<Type_ActionType_Fragment>
  codeMirrorTypes: Array<Type_CodeMirrorType_Fragment>
}

export const GetPageBuilderDocument = gql`
  query GetPageBuilder($appId: ID!, $pageId: ID!, $typeIds: [ID!]) {
    apps(where: { id: $appId }) {
      ...PageBuilderApp
    }
    stores {
      ...Store
    }
    components {
      ...Component
    }
    primitiveTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    arrayTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    unionTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    interfaceTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    elementTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    renderPropsTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    reactNodeTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    enumTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    lambdaTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    pageTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    appTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    actionTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
    codeMirrorTypes(where: { id_IN: $typeIds }) {
      ...Type
    }
  }
  ${PageBuilderAppFragmentDoc}
  ${StoreFragmentDoc}
  ${ComponentFragmentDoc}
  ${TypeFragmentDoc}
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
    GetPageBuilder(
      variables: GetPageBuilderQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPageBuilderQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPageBuilderQuery>(
            GetPageBuilderDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPageBuilder',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
