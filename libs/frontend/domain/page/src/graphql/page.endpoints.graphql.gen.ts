import * as Types from '@codelab/shared/abstract/codegen'

import { PageFragment } from '../../../../abstract/core/src/domain/page/page.fragment.graphql.gen'
import {
  PageBuilderAppFragment,
  BuilderPageFragment,
} from '../../../../abstract/core/src/domain/app/app.fragment.graphql.gen'
import { ResourceFragment } from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'
import { RenderedComponentFragment } from '../../../../abstract/core/src/domain/component/component-render.fragment.graphql.gen'
import {
  Type_ActionType_Fragment,
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_BaseType_Fragment,
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
} from '../../../../abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { PageFragmentDoc } from '../../../../abstract/core/src/domain/page/page.fragment.graphql.gen'
import {
  PageBuilderAppFragmentDoc,
  BuilderPageFragmentDoc,
} from '../../../../abstract/core/src/domain/app/app.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../../../abstract/core/src/domain/resource/resource.fragment.graphql.gen'
import { RenderedComponentFragmentDoc } from '../../../../abstract/core/src/domain/component/component-render.fragment.graphql.gen'
import { TypeFragmentDoc } from '../../../../abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'
export type CreatePagesMutationVariables = Types.Exact<{
  input: Array<Types.PageCreateInput> | Types.PageCreateInput
}>

export type CreatePagesMutation = {
  createPages: { pages: Array<PageFragment> }
}

export type DeletePagesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
  delete?: Types.InputMaybe<Types.PageDeleteInput>
}>

export type DeletePagesMutation = { deletePages: { nodesDeleted: number } }

export type UpdatePagesMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
  update?: Types.InputMaybe<Types.PageUpdateInput>
}>

export type UpdatePagesMutation = {
  updatePages: { pages: Array<PageFragment> }
}

export type GetPagesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageOptions>
  where?: Types.InputMaybe<Types.PageWhere>
}>

export type GetPagesQuery = { pages: Array<PageFragment> }

export type GetRenderedPageAndCommonAppDataQueryVariables = Types.Exact<{
  appId: Types.Scalars['ID']
  pageId: Types.Scalars['ID']
  typeIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetRenderedPageAndCommonAppDataQuery = {
  apps: Array<PageBuilderAppFragment>
  components: Array<RenderedComponentFragment>
  resources: Array<ResourceFragment>
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

export type GetRenderedPageQueryVariables = Types.Exact<{
  pageId: Types.Scalars['ID']
}>

export type GetRenderedPageQuery = { pages: Array<BuilderPageFragment> }

export const CreatePagesDocument = gql`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const DeletePagesDocument = gql`
  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
    deletePages(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdatePagesDocument = gql`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(where: $where, update: $update) {
      pages {
        ...Page
      }
    }
  }
  ${PageFragmentDoc}
`
export const GetPagesDocument = gql`
  query GetPages($options: PageOptions, $where: PageWhere) {
    pages(options: $options, where: $where) {
      ...Page
    }
  }
  ${PageFragmentDoc}
`
export const GetRenderedPageAndCommonAppDataDocument = gql`
  query GetRenderedPageAndCommonAppData(
    $appId: ID!
    $pageId: ID!
    $typeIds: [ID!]
  ) {
    apps(where: { id: $appId }) {
      ...PageBuilderApp
    }
    components {
      ...RenderedComponent
    }
    resources {
      ...Resource
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
  ${RenderedComponentFragmentDoc}
  ${ResourceFragmentDoc}
  ${TypeFragmentDoc}
`
export const GetRenderedPageDocument = gql`
  query GetRenderedPage($pageId: ID!) {
    pages(where: { id: $pageId }) {
      ...BuilderPage
    }
  }
  ${BuilderPageFragmentDoc}
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
    CreatePages(
      variables: CreatePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePagesMutation>(CreatePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreatePages',
        'mutation',
      )
    },
    DeletePages(
      variables?: DeletePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePagesMutation>(DeletePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeletePages',
        'mutation',
      )
    },
    UpdatePages(
      variables?: UpdatePagesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePagesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePagesMutation>(UpdatePagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdatePages',
        'mutation',
      )
    },
    GetPages(
      variables?: GetPagesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPagesQuery>(GetPagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetPages',
        'query',
      )
    },
    GetRenderedPageAndCommonAppData(
      variables: GetRenderedPageAndCommonAppDataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRenderedPageAndCommonAppDataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderedPageAndCommonAppDataQuery>(
            GetRenderedPageAndCommonAppDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderedPageAndCommonAppData',
        'query',
      )
    },
    GetRenderedPage(
      variables: GetRenderedPageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRenderedPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRenderedPageQuery>(
            GetRenderedPageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRenderedPage',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
