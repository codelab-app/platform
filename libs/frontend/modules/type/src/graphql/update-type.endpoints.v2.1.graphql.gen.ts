import * as Types from '@codelab/shared/abstract/codegen-v2'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  AppTypeFragment,
  AppTypeFragmentDoc,
} from './fragments/app-type.fragment.v2.1.graphql.gen'
import {
  ArrayTypeFragment,
  ArrayTypeFragmentDoc,
  ArrayTypeWithItemTypeFragment,
  ArrayTypeWithItemTypeFragmentDoc,
} from './fragments/array-type.fragment.v2.1.graphql.gen'
import {
  ElementTypeFragment,
  ElementTypeFragmentDoc,
} from './fragments/element-type.fragment.v2.1.graphql.gen'
import {
  EnumTypeFragment,
  EnumTypeFragmentDoc,
} from './fragments/enum-type.fragment.v2.1.graphql.gen'
import {
  EnumTypeValueFragment,
  EnumTypeValueFragmentDoc,
} from './fragments/enum-type-value.fragment.v2.1.graphql.gen'
import {
  InterfaceTypeFieldEdgeFragment,
  InterfaceTypeFieldEdgeFragmentDoc,
  InterfaceTypeFragment,
  InterfaceTypeFragmentDoc,
} from './fragments/interface.fragment.v2.1.graphql.gen'
import {
  LambdaTypeFragment,
  LambdaTypeFragmentDoc,
} from './fragments/lambda-type.fragment.v2.1.graphql.gen'
import {
  MonacoTypeFragment,
  MonacoTypeFragmentDoc,
} from './fragments/monaco-type.fragment.v2.1.graphql.gen'
import {
  PageTypeFragment,
  PageTypeFragmentDoc,
} from './fragments/page-type.fragment.v2.1.graphql.gen'
import {
  PrimitiveTypeFragment,
  PrimitiveTypeFragmentDoc,
} from './fragments/primitive-type.fragment.v2.1.graphql.gen'
import {
  RenderPropsTypeFragment,
  RenderPropsTypeFragmentDoc,
} from './fragments/render-props.fragment.v2.1.graphql.gen'
import {
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_MonacoType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
  TypeFragmentDoc,
} from './fragments/type.fragment.v2.1.graphql.gen'
import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
  TypeBaseFragmentDoc,
} from './fragments/type-base.fragment.v2.1.graphql.gen'
import {
  UnionTypeFragment,
  UnionTypeFragmentDoc,
  UnionTypeWithInnerTypesFragment,
  UnionTypeWithInnerTypesFragmentDoc,
} from './fragments/union-type.fragment.v2.1.graphql.gen'

export type UpdatePrimitiveTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.PrimitiveTypeConnectInput>
  create?: Types.InputMaybe<Types.PrimitiveTypeRelationInput>
  delete?: Types.InputMaybe<Types.PrimitiveTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.PrimitiveTypeDisconnectInput>
  update?: Types.InputMaybe<Types.PrimitiveTypeUpdateInput>
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>
}>

export type UpdatePrimitiveTypesMutation = {
  types: { types: Array<Type_PrimitiveType_Fragment> }
}

export type UpdateArrayTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ArrayTypeConnectInput>
  create?: Types.InputMaybe<Types.ArrayTypeRelationInput>
  delete?: Types.InputMaybe<Types.ArrayTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.ArrayTypeDisconnectInput>
  update?: Types.InputMaybe<Types.ArrayTypeUpdateInput>
  where?: Types.InputMaybe<Types.ArrayTypeWhere>
}>

export type UpdateArrayTypesMutation = {
  types: { types: Array<Type_ArrayType_Fragment> }
}

export type UpdateUnionTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.UnionTypeConnectInput>
  create?: Types.InputMaybe<Types.UnionTypeRelationInput>
  delete?: Types.InputMaybe<Types.UnionTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.UnionTypeDisconnectInput>
  update?: Types.InputMaybe<Types.UnionTypeUpdateInput>
  where?: Types.InputMaybe<Types.UnionTypeWhere>
}>

export type UpdateUnionTypesMutation = {
  types: { types: Array<Type_UnionType_Fragment> }
}

export type UpdateInterfaceTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.InterfaceTypeConnectInput>
  create?: Types.InputMaybe<Types.InterfaceTypeRelationInput>
  delete?: Types.InputMaybe<Types.InterfaceTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.InterfaceTypeDisconnectInput>
  update?: Types.InputMaybe<Types.InterfaceTypeUpdateInput>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type UpdateInterfaceTypesMutation = {
  types: { types: Array<Type_InterfaceType_Fragment> }
}

export type UpdateReactNodeTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ElementTypeConnectInput>
  create?: Types.InputMaybe<Types.ElementTypeRelationInput>
  delete?: Types.InputMaybe<Types.ElementTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.ElementTypeDisconnectInput>
  update?: Types.InputMaybe<Types.ElementTypeUpdateInput>
  where?: Types.InputMaybe<Types.ElementTypeWhere>
}>

export type UpdateReactNodeTypesMutation = {
  types: { types: Array<Type_ReactNodeType_Fragment> }
}

export type UpdateElementTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ElementTypeConnectInput>
  create?: Types.InputMaybe<Types.ElementTypeRelationInput>
  delete?: Types.InputMaybe<Types.ElementTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.ElementTypeDisconnectInput>
  update?: Types.InputMaybe<Types.ElementTypeUpdateInput>
  where?: Types.InputMaybe<Types.ElementTypeWhere>
}>

export type UpdateElementTypesMutation = {
  types: { types: Array<Type_ElementType_Fragment> }
}

export type UpdateRenderPropsTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.RenderPropsTypeConnectInput>
  create?: Types.InputMaybe<Types.RenderPropsTypeRelationInput>
  delete?: Types.InputMaybe<Types.RenderPropsTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.RenderPropsTypeDisconnectInput>
  update?: Types.InputMaybe<Types.RenderPropsTypeUpdateInput>
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>
}>

export type UpdateRenderPropsTypesMutation = {
  types: { types: Array<Type_RenderPropsType_Fragment> }
}

export type UpdateEnumTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.EnumTypeConnectInput>
  create?: Types.InputMaybe<Types.EnumTypeRelationInput>
  delete?: Types.InputMaybe<Types.EnumTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.EnumTypeDisconnectInput>
  update?: Types.InputMaybe<Types.EnumTypeUpdateInput>
  where?: Types.InputMaybe<Types.EnumTypeWhere>
}>

export type UpdateEnumTypesMutation = {
  types: { types: Array<Type_EnumType_Fragment> }
}

export type UpdateLambdaTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.LambdaTypeConnectInput>
  create?: Types.InputMaybe<Types.LambdaTypeRelationInput>
  delete?: Types.InputMaybe<Types.LambdaTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.LambdaTypeDisconnectInput>
  update?: Types.InputMaybe<Types.LambdaTypeUpdateInput>
  where?: Types.InputMaybe<Types.LambdaTypeWhere>
}>

export type UpdateLambdaTypesMutation = {
  types: { types: Array<Type_LambdaType_Fragment> }
}

export type UpdatePageTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.PageTypeConnectInput>
  create?: Types.InputMaybe<Types.PageTypeRelationInput>
  delete?: Types.InputMaybe<Types.PageTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.PageTypeDisconnectInput>
  update?: Types.InputMaybe<Types.PageTypeUpdateInput>
  where?: Types.InputMaybe<Types.PageTypeWhere>
}>

export type UpdatePageTypesMutation = {
  types: { types: Array<Type_PageType_Fragment> }
}

export type UpdateAppTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.AppTypeConnectInput>
  create?: Types.InputMaybe<Types.AppTypeRelationInput>
  delete?: Types.InputMaybe<Types.AppTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.AppTypeDisconnectInput>
  update?: Types.InputMaybe<Types.AppTypeUpdateInput>
  where?: Types.InputMaybe<Types.AppTypeWhere>
}>

export type UpdateAppTypesMutation = {
  types: { types: Array<Type_AppType_Fragment> }
}

export type UpdateMonacoTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.MonacoTypeConnectInput>
  create?: Types.InputMaybe<Types.MonacoTypeRelationInput>
  delete?: Types.InputMaybe<Types.MonacoTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.MonacoTypeDisconnectInput>
  update?: Types.InputMaybe<Types.MonacoTypeUpdateInput>
  where?: Types.InputMaybe<Types.MonacoTypeWhere>
}>

export type UpdateMonacoTypesMutation = {
  types: { types: Array<Type_MonacoType_Fragment> }
}

export const UpdatePrimitiveTypesDocument = gql`
  mutation UpdatePrimitiveTypes(
    $connect: PrimitiveTypeConnectInput
    $create: PrimitiveTypeRelationInput
    $delete: PrimitiveTypeDeleteInput
    $disconnect: PrimitiveTypeDisconnectInput
    $update: PrimitiveTypeUpdateInput
    $where: PrimitiveTypeWhere
  ) {
    types: updatePrimitiveTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: primitiveTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateArrayTypesDocument = gql`
  mutation UpdateArrayTypes(
    $connect: ArrayTypeConnectInput
    $create: ArrayTypeRelationInput
    $delete: ArrayTypeDeleteInput
    $disconnect: ArrayTypeDisconnectInput
    $update: ArrayTypeUpdateInput
    $where: ArrayTypeWhere
  ) {
    types: updateArrayTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: arrayTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateUnionTypesDocument = gql`
  mutation UpdateUnionTypes(
    $connect: UnionTypeConnectInput
    $create: UnionTypeRelationInput
    $delete: UnionTypeDeleteInput
    $disconnect: UnionTypeDisconnectInput
    $update: UnionTypeUpdateInput
    $where: UnionTypeWhere
  ) {
    types: updateUnionTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: unionTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateInterfaceTypesDocument = gql`
  mutation UpdateInterfaceTypes(
    $connect: InterfaceTypeConnectInput
    $create: InterfaceTypeRelationInput
    $delete: InterfaceTypeDeleteInput
    $disconnect: InterfaceTypeDisconnectInput
    $update: InterfaceTypeUpdateInput
    $where: InterfaceTypeWhere
  ) {
    types: updateInterfaceTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: interfaceTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateReactNodeTypesDocument = gql`
  mutation UpdateReactNodeTypes(
    $connect: ElementTypeConnectInput
    $create: ElementTypeRelationInput
    $delete: ElementTypeDeleteInput
    $disconnect: ElementTypeDisconnectInput
    $update: ElementTypeUpdateInput
    $where: ElementTypeWhere
  ) {
    types: updateReactNodeTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: reactNodeTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateElementTypesDocument = gql`
  mutation UpdateElementTypes(
    $connect: ElementTypeConnectInput
    $create: ElementTypeRelationInput
    $delete: ElementTypeDeleteInput
    $disconnect: ElementTypeDisconnectInput
    $update: ElementTypeUpdateInput
    $where: ElementTypeWhere
  ) {
    types: updateElementTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: elementTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateRenderPropsTypesDocument = gql`
  mutation UpdateRenderPropsTypes(
    $connect: RenderPropsTypeConnectInput
    $create: RenderPropsTypeRelationInput
    $delete: RenderPropsTypeDeleteInput
    $disconnect: RenderPropsTypeDisconnectInput
    $update: RenderPropsTypeUpdateInput
    $where: RenderPropsTypeWhere
  ) {
    types: updateRenderPropsTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: renderPropsTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateEnumTypesDocument = gql`
  mutation UpdateEnumTypes(
    $connect: EnumTypeConnectInput
    $create: EnumTypeRelationInput
    $delete: EnumTypeDeleteInput
    $disconnect: EnumTypeDisconnectInput
    $update: EnumTypeUpdateInput
    $where: EnumTypeWhere
  ) {
    types: updateEnumTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: enumTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateLambdaTypesDocument = gql`
  mutation UpdateLambdaTypes(
    $connect: LambdaTypeConnectInput
    $create: LambdaTypeRelationInput
    $delete: LambdaTypeDeleteInput
    $disconnect: LambdaTypeDisconnectInput
    $update: LambdaTypeUpdateInput
    $where: LambdaTypeWhere
  ) {
    types: updateLambdaTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: lambdaTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdatePageTypesDocument = gql`
  mutation UpdatePageTypes(
    $connect: PageTypeConnectInput
    $create: PageTypeRelationInput
    $delete: PageTypeDeleteInput
    $disconnect: PageTypeDisconnectInput
    $update: PageTypeUpdateInput
    $where: PageTypeWhere
  ) {
    types: updatePageTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: pageTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateAppTypesDocument = gql`
  mutation UpdateAppTypes(
    $connect: AppTypeConnectInput
    $create: AppTypeRelationInput
    $delete: AppTypeDeleteInput
    $disconnect: AppTypeDisconnectInput
    $update: AppTypeUpdateInput
    $where: AppTypeWhere
  ) {
    types: updateAppTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: appTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
`
export const UpdateMonacoTypesDocument = gql`
  mutation UpdateMonacoTypes(
    $connect: MonacoTypeConnectInput
    $create: MonacoTypeRelationInput
    $delete: MonacoTypeDeleteInput
    $disconnect: MonacoTypeDisconnectInput
    $update: MonacoTypeUpdateInput
    $where: MonacoTypeWhere
  ) {
    types: updateMonacoTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: monacoTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
  ${TypeBaseFragmentDoc}
  ${ArrayTypeWithItemTypeFragmentDoc}
  ${ArrayTypeFragmentDoc}
  ${EnumTypeFragmentDoc}
  ${EnumTypeValueFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${InterfaceTypeFieldEdgeFragmentDoc}
  ${PrimitiveTypeFragmentDoc}
  ${ElementTypeFragmentDoc}
  ${LambdaTypeFragmentDoc}
  ${RenderPropsTypeFragmentDoc}
  ${UnionTypeWithInnerTypesFragmentDoc}
  ${UnionTypeFragmentDoc}
  ${MonacoTypeFragmentDoc}
  ${PageTypeFragmentDoc}
  ${AppTypeFragmentDoc}
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
    UpdatePrimitiveTypes(
      variables?: UpdatePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePrimitiveTypesMutation>(
            UpdatePrimitiveTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePrimitiveTypes',
        'mutation',
      )
    },
    UpdateArrayTypes(
      variables?: UpdateArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateArrayTypesMutation>(
            UpdateArrayTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateArrayTypes',
        'mutation',
      )
    },
    UpdateUnionTypes(
      variables?: UpdateUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUnionTypesMutation>(
            UpdateUnionTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateUnionTypes',
        'mutation',
      )
    },
    UpdateInterfaceTypes(
      variables?: UpdateInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateInterfaceTypesMutation>(
            UpdateInterfaceTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateInterfaceTypes',
        'mutation',
      )
    },
    UpdateReactNodeTypes(
      variables?: UpdateReactNodeTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateReactNodeTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateReactNodeTypesMutation>(
            UpdateReactNodeTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateReactNodeTypes',
        'mutation',
      )
    },
    UpdateElementTypes(
      variables?: UpdateElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateElementTypesMutation>(
            UpdateElementTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateElementTypes',
        'mutation',
      )
    },
    UpdateRenderPropsTypes(
      variables?: UpdateRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateRenderPropsTypesMutation>(
            UpdateRenderPropsTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateRenderPropsTypes',
        'mutation',
      )
    },
    UpdateEnumTypes(
      variables?: UpdateEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateEnumTypesMutation>(
            UpdateEnumTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateEnumTypes',
        'mutation',
      )
    },
    UpdateLambdaTypes(
      variables?: UpdateLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateLambdaTypesMutation>(
            UpdateLambdaTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateLambdaTypes',
        'mutation',
      )
    },
    UpdatePageTypes(
      variables?: UpdatePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdatePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePageTypesMutation>(
            UpdatePageTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdatePageTypes',
        'mutation',
      )
    },
    UpdateAppTypes(
      variables?: UpdateAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAppTypesMutation>(
            UpdateAppTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateAppTypes',
        'mutation',
      )
    },
    UpdateMonacoTypes(
      variables?: UpdateMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateMonacoTypesMutation>(
            UpdateMonacoTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateMonacoTypes',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
