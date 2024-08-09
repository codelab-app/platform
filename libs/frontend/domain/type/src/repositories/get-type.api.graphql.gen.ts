import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  BaseTypeFragmentDoc,
  TypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RichTextTypeFragmentDoc,
} from '@codelab/shared/infra/gql'

export const GetBaseTypesDocument = graphql(`
  query GetBaseTypes($options: GetBaseTypesOptions) {
    baseTypes(options: $options) {
      items {
        ...BaseType
      }
      totalCount
    }
  }
`)

export const GetTypesDocument = graphql(`
  query GetTypes($ids: [ID!]) {
    actionTypes(where: { id_IN: $ids }) {
      ...Type
    }
    appTypes(where: { id_IN: $ids }) {
      ...Type
    }
    arrayTypes(where: { id_IN: $ids }) {
      ...Type
    }
    codeMirrorTypes(where: { id_IN: $ids }) {
      ...Type
    }
    elementTypes(where: { id_IN: $ids }) {
      ...Type
    }
    enumTypes(where: { id_IN: $ids }) {
      ...Type
    }
    interfaceTypes(where: { id_IN: $ids }) {
      ...Type
    }
    lambdaTypes(where: { id_IN: $ids }) {
      ...Type
    }
    pageTypes(where: { id_IN: $ids }) {
      ...Type
    }
    primitiveTypes(where: { id_IN: $ids }) {
      ...Type
    }
    reactNodeTypes(where: { id_IN: $ids }) {
      ...Type
    }
    renderPropTypes(where: { id_IN: $ids }) {
      ...Type
    }
    richTextTypes(where: { id_IN: $ids }) {
      ...Type
    }
    unionTypes(where: { id_IN: $ids }) {
      ...Type
    }
  }
`)

export const GetDescendantsDocument = graphql(`
  query GetDescendants($ids: [ID!]) {
    arrayTypes(where: { id_IN: $ids }) {
      descendantTypesIds
    }
    interfaceTypes(where: { id_IN: $ids }) {
      descendantTypesIds
    }
    unionTypes(where: { id_IN: $ids }) {
      descendantTypesIds
    }
  }
`)

export const GetPrimitiveTypesDocument = graphql(`
  query GetPrimitiveTypes(
    $options: PrimitiveTypeOptions
    $where: PrimitiveTypeWhere
  ) {
    types: primitiveTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetArrayTypesDocument = graphql(`
  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
    types: arrayTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetUnionTypesDocument = graphql(`
  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
    types: unionTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetInterfaceTypesDocument = graphql(`
  query GetInterfaceTypes(
    $options: InterfaceTypeOptions
    $where: InterfaceTypeWhere
  ) {
    types: interfaceTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetElementTypesDocument = graphql(`
  query GetElementTypes(
    $options: ElementTypeOptions
    $where: ElementTypeWhere
  ) {
    types: elementTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetRenderPropTypesDocument = graphql(`
  query GetRenderPropTypes(
    $options: RenderPropTypeOptions
    $where: RenderPropTypeWhere
  ) {
    types: renderPropTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetReactNodeTypesDocument = graphql(`
  query GetReactNodeTypes(
    $options: ReactNodeTypeOptions
    $where: ReactNodeTypeWhere
  ) {
    types: reactNodeTypes(options: $options, where: $where) {
      ...ReactNodeType
    }
  }
`)

export const GetRichTextTypesDocument = graphql(`
  query GetRichTextTypes(
    $options: RichTextTypeOptions
    $where: RichTextTypeWhere
  ) {
    types: richTextTypes(options: $options, where: $where) {
      ...RichTextType
    }
  }
`)

export const GetEnumTypesDocument = graphql(`
  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
    types: enumTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetLambdaTypesDocument = graphql(`
  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
    types: lambdaTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetPageTypesDocument = graphql(`
  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
    types: pageTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetAppTypesDocument = graphql(`
  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
    types: appTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetActionTypesDocument = graphql(`
  query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {
    types: actionTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetCodeMirrorTypesDocument = graphql(`
  query GetCodeMirrorTypes(
    $options: CodeMirrorTypeOptions
    $where: CodeMirrorTypeWhere
  ) {
    types: codeMirrorTypes(options: $options, where: $where) {
      ...Type
    }
  }
`)

export const GetTypeOptionsDocument = graphql(`
  query GetTypeOptions {
    baseTypes {
      items {
        id
        kind
        name
      }
    }
  }
`)

import {
  type GetBaseTypesQueryVariables,
  type GetTypesQueryVariables,
  type GetDescendantsQueryVariables,
  type GetPrimitiveTypesQueryVariables,
  type GetArrayTypesQueryVariables,
  type GetUnionTypesQueryVariables,
  type GetInterfaceTypesQueryVariables,
  type GetElementTypesQueryVariables,
  type GetRenderPropTypesQueryVariables,
  type GetReactNodeTypesQueryVariables,
  type GetRichTextTypesQueryVariables,
  type GetEnumTypesQueryVariables,
  type GetLambdaTypesQueryVariables,
  type GetPageTypesQueryVariables,
  type GetAppTypesQueryVariables,
  type GetActionTypesQueryVariables,
  type GetCodeMirrorTypesQueryVariables,
  type GetTypeOptionsQueryVariables,
} from '@codelab/frontend/infra/gql'

export const GetBaseTypes = (
  variables: GetBaseTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetBaseTypesDocument.toString(), variables, next)

export const GetTypes = (
  variables: GetTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypesDocument.toString(), variables, next)

export const GetDescendants = (
  variables: GetDescendantsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetDescendantsDocument.toString(), variables, next)

export const GetPrimitiveTypes = (
  variables: GetPrimitiveTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPrimitiveTypesDocument.toString(), variables, next)

export const GetArrayTypes = (
  variables: GetArrayTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetArrayTypesDocument.toString(), variables, next)

export const GetUnionTypes = (
  variables: GetUnionTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetUnionTypesDocument.toString(), variables, next)

export const GetInterfaceTypes = (
  variables: GetInterfaceTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetInterfaceTypesDocument.toString(), variables, next)

export const GetElementTypes = (
  variables: GetElementTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetElementTypesDocument.toString(), variables, next)

export const GetRenderPropTypes = (
  variables: GetRenderPropTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetRenderPropTypesDocument.toString(), variables, next)

export const GetReactNodeTypes = (
  variables: GetReactNodeTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetReactNodeTypesDocument.toString(), variables, next)

export const GetRichTextTypes = (
  variables: GetRichTextTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetRichTextTypesDocument.toString(), variables, next)

export const GetEnumTypes = (
  variables: GetEnumTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetEnumTypesDocument.toString(), variables, next)

export const GetLambdaTypes = (
  variables: GetLambdaTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetLambdaTypesDocument.toString(), variables, next)

export const GetPageTypes = (
  variables: GetPageTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPageTypesDocument.toString(), variables, next)

export const GetAppTypes = (
  variables: GetAppTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAppTypesDocument.toString(), variables, next)

export const GetActionTypes = (
  variables: GetActionTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetActionTypesDocument.toString(), variables, next)

export const GetCodeMirrorTypes = (
  variables: GetCodeMirrorTypesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetCodeMirrorTypesDocument.toString(), variables, next)

export const GetTypeOptions = (
  variables: GetTypeOptionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypeOptionsDocument.toString(), variables, next)
