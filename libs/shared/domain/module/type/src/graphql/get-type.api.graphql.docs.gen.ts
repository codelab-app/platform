import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import {
  BaseTypeFragmentDoc,
  TypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RichTextTypeFragmentDoc,
} from '@codelab/shared/infra/gql'

export const GetBaseTypesDocument = graphql(`
  query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {
    iBaseTypes(where: $where, options: $options) {
      ...BaseType
    }
    aggregate: iBaseTypesAggregate(where: $where) {
      count
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
