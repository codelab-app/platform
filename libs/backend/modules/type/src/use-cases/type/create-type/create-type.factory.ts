/**
 * Used to convert a TypeGraph into create types
 */
import { TypeKind } from '@codelab/shared/enums'
import { TypeVertex } from '../../../domain'
import { CreateTypeInput } from './create-type.input'

export class CreateTypeFactory {
  static toCreateInput(vertex: TypeVertex): CreateTypeInput {
    switch (vertex.typeKind) {
      case TypeKind.InterfaceType:
        return {
          name: vertex.name,
          typeKind: TypeKind.InterfaceType,
        }
      /**
       * During hydration, we wouldn't want to create new primitive types. We require these primitive types to be available already.
       */
      case TypeKind.PrimitiveType:
        return {
          name: vertex.name,
          typeKind: TypeKind.PrimitiveType,
          primitiveType: {
            primitiveKind: vertex.primitiveKind,
          },
        }
      case TypeKind.LambdaType:
        return {
          name: vertex.name,
          typeKind: TypeKind.LambdaType,
        }
      case TypeKind.ArrayType:
        return {
          name: vertex.name,
          typeKind: TypeKind.ArrayType,
        }
      case TypeKind.EnumType:
        return {
          name: vertex.name,
          typeKind: TypeKind.EnumType,
          enumType: {
            allowedValues: vertex.allowedValues,
          },
        }
      case TypeKind.ComponentType:
        return {
          name: vertex.name,
          typeKind: TypeKind.ComponentType,
        }
      default:
        throw new Error(`${vertex.typeKind} is an Invalid TypeKind`)
    }
  }
}
