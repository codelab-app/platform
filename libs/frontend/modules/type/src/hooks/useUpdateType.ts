import { TypeKind } from '@codelab/shared/abstract/core'
import { updateTypeEndpoints } from '../store'

export const useUpdateType = () => {
  return {
    [TypeKind.ElementType]: updateTypeEndpoints.useUpdateElementTypesMutation(),
    [TypeKind.ArrayType]: updateTypeEndpoints.useUpdateArrayTypesMutation(),
    [TypeKind.UnionType]: updateTypeEndpoints.useUpdateUnionTypesMutation(),
    [TypeKind.EnumType]: updateTypeEndpoints.useUpdateEnumTypesMutation(),
    [TypeKind.LambdaType]: updateTypeEndpoints.useUpdateLambdaTypesMutation(),
    [TypeKind.PageType]: updateTypeEndpoints.useUpdatePageTypesMutation(),
    [TypeKind.AppType]: updateTypeEndpoints.useUpdateAppTypesMutation(),
    [TypeKind.MonacoType]: updateTypeEndpoints.useUpdateMonacoTypesMutation(),
    [TypeKind.InterfaceType]:
      updateTypeEndpoints.useUpdateInterfaceTypesMutation(),
    [TypeKind.PrimitiveType]:
      updateTypeEndpoints.useUpdatePrimitiveTypesMutation(),
    [TypeKind.RenderPropsType]:
      updateTypeEndpoints.useUpdateRenderPropsTypesMutation(),
  }
}
