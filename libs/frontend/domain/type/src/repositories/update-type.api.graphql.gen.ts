import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const UpdatePrimitiveTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateArrayTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateUnionTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateInterfaceTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateReactNodeTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateElementTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateRenderPropTypesDocument = graphql(`
  mutation UpdateRenderPropTypes(
    $connect: RenderPropTypeConnectInput
    $create: RenderPropTypeRelationInput
    $delete: RenderPropTypeDeleteInput
    $disconnect: RenderPropTypeDisconnectInput
    $update: RenderPropTypeUpdateInput
    $where: RenderPropTypeWhere
  ) {
    types: updateRenderPropTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: renderPropTypes {
        id
      }
    }
  }
`)

export const UpdateEnumTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateLambdaTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdatePageTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateAppTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateRichTextTypesDocument = graphql(`
  mutation UpdateRichTextTypes(
    $connect: RichTextTypeConnectInput
    $create: RichTextTypeRelationInput
    $delete: RichTextTypeDeleteInput
    $disconnect: RichTextTypeDisconnectInput
    $update: RichTextTypeUpdateInput
    $where: RichTextTypeWhere
  ) {
    types: updateRichTextTypes(
      connect: $connect
      create: $create
      delete: $delete
      disconnect: $disconnect
      update: $update
      where: $where
    ) {
      types: richTextTypes {
        id
      }
    }
  }
`)

export const UpdateActionTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

export const UpdateCodeMirrorTypesDocument = graphql(`
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
        id
      }
    }
  }
`)

import {
  type UpdatePrimitiveTypesMutationVariables,
  type UpdateArrayTypesMutationVariables,
  type UpdateUnionTypesMutationVariables,
  type UpdateInterfaceTypesMutationVariables,
  type UpdateReactNodeTypesMutationVariables,
  type UpdateElementTypesMutationVariables,
  type UpdateRenderPropTypesMutationVariables,
  type UpdateEnumTypesMutationVariables,
  type UpdateLambdaTypesMutationVariables,
  type UpdatePageTypesMutationVariables,
  type UpdateAppTypesMutationVariables,
  type UpdateRichTextTypesMutationVariables,
  type UpdateActionTypesMutationVariables,
  type UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/frontend/infra/gql'

export const UpdatePrimitiveTypes = (
  variables: UpdatePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePrimitiveTypesDocument.toString(), variables, next)

export const UpdateArrayTypes = (
  variables: UpdateArrayTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateArrayTypesDocument.toString(), variables, next)

export const UpdateUnionTypes = (
  variables: UpdateUnionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateUnionTypesDocument.toString(), variables, next)

export const UpdateInterfaceTypes = (
  variables: UpdateInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateInterfaceTypesDocument.toString(), variables, next)

export const UpdateReactNodeTypes = (
  variables: UpdateReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateReactNodeTypesDocument.toString(), variables, next)

export const UpdateElementTypes = (
  variables: UpdateElementTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateElementTypesDocument.toString(), variables, next)

export const UpdateRenderPropTypes = (
  variables: UpdateRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateRenderPropTypesDocument.toString(), variables, next)

export const UpdateEnumTypes = (
  variables: UpdateEnumTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateEnumTypesDocument.toString(), variables, next)

export const UpdateLambdaTypes = (
  variables: UpdateLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateLambdaTypesDocument.toString(), variables, next)

export const UpdatePageTypes = (
  variables: UpdatePageTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePageTypesDocument.toString(), variables, next)

export const UpdateAppTypes = (
  variables: UpdateAppTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAppTypesDocument.toString(), variables, next)

export const UpdateRichTextTypes = (
  variables: UpdateRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateRichTextTypesDocument.toString(), variables, next)

export const UpdateActionTypes = (
  variables: UpdateActionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateActionTypesDocument.toString(), variables, next)

export const UpdateCodeMirrorTypes = (
  variables: UpdateCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateCodeMirrorTypesDocument.toString(), variables, next)
