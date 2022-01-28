import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeInput } from './inputs/create-type.input'

/**
 * Used to convert a {@link TypeVertex} into {@link CreateTypeInput} and vice-versa
 */
export class CreateTypeInputFactory {
  /** Creates an IType from a CreateTypeInput */
  static toType({
    name,
    typeKind,
    elementType,
    monacoType,
    enumType,
    primitiveType,
    unionType,
    arrayType,
  }: CreateTypeInput): IType {
    const common = { id: '', name, owner: null }

    const newVarReqError = (varName: string, kind: TypeKind) =>
      new Error(`${varName} is required for type kind ${kind}`)

    switch (typeKind) {
      case TypeKind.PrimitiveType:
        if (!primitiveType) {
          throw newVarReqError('primitiveType', TypeKind.PrimitiveType)
        }

        return {
          ...common,
          typeKind,
          primitiveKind: primitiveType.primitiveKind,
        }
      case TypeKind.ArrayType:
        if (!arrayType) {
          throw newVarReqError('arrayType', TypeKind.ArrayType)
        }

        return { ...common, typeKind, itemType: { id: arrayType.itemTypeId } }
      case TypeKind.EnumType:
        if (!enumType) {
          throw newVarReqError('enumType', TypeKind.EnumType)
        }

        return {
          ...common,
          typeKind,
          allowedValues: enumType.allowedValues.map((av) => ({
            name: av.name,
            value: av.value,
            id: '',
          })),
        }

      case TypeKind.ElementType:
        if (!elementType) {
          throw newVarReqError('elementType', TypeKind.ElementType)
        }

        return { ...common, typeKind, elementKind: elementType.kind }

      case TypeKind.UnionType:
        if (!unionType) {
          throw newVarReqError('unionType', TypeKind.UnionType)
        }

        return {
          ...common,
          typeKind,
          typesOfUnionType: unionType.typeIdsOfUnionType.map((id) => ({ id })),
        }
      case TypeKind.MonacoType:
        if (!monacoType) {
          throw newVarReqError('monacoType', TypeKind.MonacoType)
        }

        return { ...common, typeKind, language: monacoType.language }
      case TypeKind.InterfaceType:
      case TypeKind.LambdaType:
      case TypeKind.RenderPropsType:
      case TypeKind.ReactNodeType:
      case TypeKind.PageType:
      case TypeKind.AppType:
        return { ...common, typeKind } as IType
    }
  }

  static toCreateInput(vertex: IType): CreateTypeInput {
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
          arrayType: {
            itemTypeId: vertex.itemType?.id ?? '',
          },
        }
      case TypeKind.EnumType:
        return {
          name: vertex.name,
          typeKind: TypeKind.EnumType,
          enumType: {
            allowedValues: vertex.allowedValues,
          },
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
