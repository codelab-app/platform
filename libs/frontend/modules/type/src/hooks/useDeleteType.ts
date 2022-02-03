import { TypeKind } from '@codelab/shared/abstract/core'
import { deleteTypeEndpoints } from '../store'

export const useDeleteType = () => {
  return {
    [TypeKind.ElementType]: deleteTypeEndpoints.useDeleteElementTypesMutation(),
    [TypeKind.ArrayType]: deleteTypeEndpoints.useDeleteArrayTypesMutation(),
    [TypeKind.UnionType]: deleteTypeEndpoints.useDeleteUnionTypesMutation(),
    [TypeKind.EnumType]: deleteTypeEndpoints.useDeleteEnumTypesMutation(),
    [TypeKind.LambdaType]: deleteTypeEndpoints.useDeleteLambdaTypesMutation(),
    [TypeKind.PageType]: deleteTypeEndpoints.useDeletePageTypesMutation(),
    [TypeKind.AppType]: deleteTypeEndpoints.useDeleteAppTypesMutation(),
    [TypeKind.MonacoType]: deleteTypeEndpoints.useDeleteMonacoTypesMutation(),
    [TypeKind.InterfaceType]:
      deleteTypeEndpoints.useDeleteInterfaceTypesMutation(),
    [TypeKind.PrimitiveType]:
      deleteTypeEndpoints.useDeletePrimitiveTypesMutation(),
    [TypeKind.RenderPropsType]:
      deleteTypeEndpoints.useDeleteRenderPropsTypesMutation(),
  }
}
