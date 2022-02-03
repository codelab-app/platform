import { TypeKind } from '@codelab/shared/abstract/core'
import { createTypeEndpoints } from '../store'

export const useCreateType = () => {
  return {
    [TypeKind.ElementType]: createTypeEndpoints.useCreateElementTypesMutation(),
    [TypeKind.ArrayType]: createTypeEndpoints.useCreateArrayTypesMutation(),
    [TypeKind.UnionType]: createTypeEndpoints.useCreateUnionTypesMutation(),
    [TypeKind.EnumType]: createTypeEndpoints.useCreateEnumTypesMutation(),
    [TypeKind.LambdaType]: createTypeEndpoints.useCreateLambdaTypesMutation(),
    [TypeKind.PageType]: createTypeEndpoints.useCreatePageTypesMutation(),
    [TypeKind.AppType]: createTypeEndpoints.useCreateAppTypesMutation(),
    [TypeKind.MonacoType]: createTypeEndpoints.useCreateMonacoTypesMutation(),
    [TypeKind.InterfaceType]:
      createTypeEndpoints.useCreateInterfaceTypesMutation(),
    [TypeKind.PrimitiveType]:
      createTypeEndpoints.useCreatePrimitiveTypesMutation(),
    [TypeKind.RenderPropsType]:
      createTypeEndpoints.useCreateRenderPropsTypesMutation(),
  } as const
}
