import * as Types from '@codelab/shared/abstract/codegen'





import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
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
  TypeFragmentDoc,
} from '../../../../abstract/core/src/domain/type/fragments/type.fragment.graphql.gen'

export type UpdatePrimitiveTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.PrimitiveTypeConnectInput>
  create?: Types.InputMaybe<Types.PrimitiveTypeRelationInput>
  delete?: Types.InputMaybe<Types.PrimitiveTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.PrimitiveTypeDisconnectInput>
  update?: Types.InputMaybe<Types.PrimitiveTypeUpdateInput>
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>
}>

export interface UpdatePrimitiveTypesMutation {
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

export interface UpdateArrayTypesMutation {
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

export interface UpdateUnionTypesMutation {
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

export interface UpdateInterfaceTypesMutation {
  types: { types: Array<Type_InterfaceType_Fragment> }
}

export type UpdateReactNodeTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ReactNodeTypeConnectInput>
  create?: Types.InputMaybe<Types.ReactNodeTypeRelationInput>
  delete?: Types.InputMaybe<Types.ReactNodeTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.ReactNodeTypeDisconnectInput>
  update?: Types.InputMaybe<Types.ReactNodeTypeUpdateInput>
  where?: Types.InputMaybe<Types.ReactNodeTypeWhere>
}>

export interface UpdateReactNodeTypesMutation {
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

export interface UpdateElementTypesMutation {
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

export interface UpdateRenderPropsTypesMutation {
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

export interface UpdateEnumTypesMutation {
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

export interface UpdateLambdaTypesMutation {
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

export interface UpdatePageTypesMutation {
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

export interface UpdateAppTypesMutation {
  types: { types: Array<Type_AppType_Fragment> }
}

export type UpdateActionTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ActionTypeConnectInput>
  create?: Types.InputMaybe<Types.ActionTypeRelationInput>
  delete?: Types.InputMaybe<Types.ActionTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.ActionTypeDisconnectInput>
  update?: Types.InputMaybe<Types.ActionTypeUpdateInput>
  where?: Types.InputMaybe<Types.ActionTypeWhere>
}>

export interface UpdateActionTypesMutation {
  types: { types: Array<Type_ActionType_Fragment> }
}

export type UpdateCodeMirrorTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.CodeMirrorTypeConnectInput>
  create?: Types.InputMaybe<Types.CodeMirrorTypeRelationInput>
  delete?: Types.InputMaybe<Types.CodeMirrorTypeDeleteInput>
  disconnect?: Types.InputMaybe<Types.CodeMirrorTypeDisconnectInput>
  update?: Types.InputMaybe<Types.CodeMirrorTypeUpdateInput>
  where?: Types.InputMaybe<Types.CodeMirrorTypeWhere>
}>

export interface UpdateCodeMirrorTypesMutation {
  types: { types: Array<Type_CodeMirrorType_Fragment> }
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
`
export const UpdateReactNodeTypesDocument = gql`
  mutation UpdateReactNodeTypes(
    $connect: ReactNodeTypeConnectInput
    $create: ReactNodeTypeRelationInput
    $delete: ReactNodeTypeDeleteInput
    $disconnect: ReactNodeTypeDisconnectInput
    $update: ReactNodeTypeUpdateInput
    $where: ReactNodeTypeWhere
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
`
export const UpdateActionTypesDocument = gql`
  mutation UpdateActionTypes(
    $connect: ActionTypeConnectInput
    $create: ActionTypeRelationInput
    $delete: ActionTypeDeleteInput
    $disconnect: ActionTypeDisconnectInput
    $update: ActionTypeUpdateInput
    $where: ActionTypeWhere
  ) {
    types: updateActionTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: actionTypes {
        ...Type
      }
    }
  }
  ${TypeFragmentDoc}
`
export const UpdateCodeMirrorTypesDocument = gql`
  mutation UpdateCodeMirrorTypes(
    $connect: CodeMirrorTypeConnectInput
    $create: CodeMirrorTypeRelationInput
    $delete: CodeMirrorTypeDeleteInput
    $disconnect: CodeMirrorTypeDisconnectInput
    $update: CodeMirrorTypeUpdateInput
    $where: CodeMirrorTypeWhere
  ) {
    types: updateCodeMirrorTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: codeMirrorTypes {
        ...Type
      }
    }
  }
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
    UpdateActionTypes(
      variables?: UpdateActionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateActionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateActionTypesMutation>(
            UpdateActionTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateActionTypes',
        'mutation',
      )
    },
    UpdateCodeMirrorTypes(
      variables?: UpdateCodeMirrorTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateCodeMirrorTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateCodeMirrorTypesMutation>(
            UpdateCodeMirrorTypesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateCodeMirrorTypes',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
