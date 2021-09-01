import { DgraphEntityType } from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/enums'

export const typeKindDgraphMap: Record<TypeKind, DgraphEntityType> = {
  [TypeKind.InterfaceType]: DgraphEntityType.InterfaceType,
  [TypeKind.PrimitiveType]: DgraphEntityType.PrimitiveType,
  [TypeKind.EnumType]: DgraphEntityType.EnumType,
  [TypeKind.ArrayType]: DgraphEntityType.ArrayType,
  [TypeKind.LambdaType]: DgraphEntityType.LambdaType,
  [TypeKind.ElementType]: DgraphEntityType.ElementType,
  [TypeKind.ComponentType]: DgraphEntityType.ComponentType,
}
