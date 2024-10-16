import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'

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
