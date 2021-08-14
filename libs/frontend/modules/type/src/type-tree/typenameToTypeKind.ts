import { TypeKind } from '@codelab/shared/graph'
import { TypeModels } from '../uses-cases/types'

export const typenameToTypeKind = (typename: string) => {
  switch (typename) {
    case TypeModels.InterfaceType:
      return TypeKind.InterfaceType
    case TypeModels.PrimitiveType:
      return TypeKind.PrimitiveType
    case TypeModels.ArrayType:
      return TypeKind.ArrayType
    case TypeModels.EnumType:
      return TypeKind.EnumType
    case TypeModels.LambdaType:
      return TypeKind.LambdaType
  }

  throw new Error("Can't recognize typename of type")
}
