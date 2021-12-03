import { TypeKind } from '@codelab/shared/abstract/core'
import { TypeVertex } from '../../../domain/'
import { CreateTypeInput } from './inputs/create-type.input'

/**
 * Used to convert a {@link TypeVertex} into {@link CreateTypeInput}
 */
export class CreateTypeInputFactory {
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
      case TypeKind.AppType:
        return {
          name: vertex.name,
          typeKind: TypeKind.AppType,
        }
      case TypeKind.PageType:
        return {
          name: vertex.name,
          typeKind: TypeKind.PageType,
        }
      case TypeKind.MonacoType:
        return {
          name: vertex.name,
          typeKind: TypeKind.MonacoType,
          monacoType: {
            language: vertex.language,
          },
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
      case TypeKind.ElementType:
        return {
          name: vertex.name,
          typeKind: TypeKind.ElementType,
          elementType: {
            kind: vertex.elementKind,
          },
        }
      case TypeKind.RenderPropsType:
        return {
          name: vertex.name,
          typeKind: TypeKind.RenderPropsType,
        }
      case TypeKind.ReactNodeType:
        return {
          name: vertex.name,
          typeKind: TypeKind.ReactNodeType,
        }
      case TypeKind.UnionType:
        return {
          name: vertex.name,
          typeKind: TypeKind.UnionType,
        }
      default:
        throw new Error(`${(vertex as any).typeKind} is an Invalid TypeKind`)
    }
  }
}
