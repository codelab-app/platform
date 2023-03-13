import type {
  IAnyType,
  IArrayTypeDTO,
  ICreateTypeData,
  IInterfaceTypeDTO,
  ITypeDTO,
  IUnionTypeDTO,
  IUpdateTypeData,
} from '@codelab/frontend/abstract/core'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  ActionType,
  AppType,
  ArrayType,
  CodeMirrorType,
  ElementType,
  EnumType,
  InterfaceType,
  LambdaType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  UnionType,
} from './models'

export class TypeFactory {
  static create(typeDTO: ITypeDTO): IAnyType {
    switch (typeDTO.__typename) {
      case ITypeKind.AppType:
        return AppType.create(typeDTO)

      case ITypeKind.ActionType:
        return ActionType.create(typeDTO)

      case ITypeKind.ElementType:
        return ElementType.create(typeDTO)

      case ITypeKind.EnumType:
        return EnumType.create(typeDTO)

      case ITypeKind.LambdaType:
        return LambdaType.create(typeDTO)

      case ITypeKind.CodeMirrorType:
        return CodeMirrorType.create(typeDTO)

      case ITypeKind.PageType:
        return PageType.create(typeDTO)

      case ITypeKind.PrimitiveType:
        return PrimitiveType.create(typeDTO)

      case ITypeKind.ReactNodeType:
        return ReactNodeType.create(typeDTO)

      case ITypeKind.RenderPropsType:
        return RenderPropsType.create(typeDTO)

      case ITypeKind.ArrayType:
        return ArrayType.create(typeDTO)

      case TypeKind.InterfaceType:
        return InterfaceType.create(typeDTO)

      case TypeKind.UnionType:
        return UnionType.create(typeDTO)

      default:
        throw new Error(`Unknown type kind: ${typeDTO.kind}`)
    }
  }

  static writeCache(typeDTO: ITypeDTO, model: IAnyType): IAnyType {
    switch (typeDTO.__typename) {
      case ITypeKind.AppType:
        model.kind === ITypeKind.AppType && model.writeCache(typeDTO)

        return model

      case ITypeKind.ActionType:
        model.kind === ITypeKind.ActionType && model.writeCache(typeDTO)

        return model

      case ITypeKind.ElementType:
        model.kind === ITypeKind.ElementType && model.writeCache(typeDTO)

        return model

      case ITypeKind.EnumType:
        model.kind === ITypeKind.EnumType && model.writeCache(typeDTO)

        return model

      case ITypeKind.LambdaType:
        model.kind === ITypeKind.LambdaType && model.writeCache(typeDTO)

        return model

      case ITypeKind.CodeMirrorType:
        model.kind === ITypeKind.CodeMirrorType && model.writeCache(typeDTO)

        return model

      case ITypeKind.PageType:
        model.kind === ITypeKind.PageType && model.writeCache(typeDTO)

        return model

      case ITypeKind.PrimitiveType:
        model.kind === ITypeKind.PrimitiveType && model.writeCache(typeDTO)

        return model

      case ITypeKind.ReactNodeType:
        model.kind === ITypeKind.ReactNodeType && model.writeCache(typeDTO)

        return model

      case ITypeKind.RenderPropsType:
        model.kind === ITypeKind.RenderPropsType && model.writeCache(typeDTO)

        return model

      case ITypeKind.ArrayType:
        model.kind === ITypeKind.ArrayType && model.writeCache(typeDTO)

        return model

      case TypeKind.InterfaceType:
        model.kind === TypeKind.InterfaceType && model.writeCache(typeDTO)

        return model

      case TypeKind.UnionType:
        model.kind === TypeKind.UnionType && model.writeCache(typeDTO)

        return model

      default:
        throw new Error(`Unknown type kind: ${typeDTO.kind}`)
    }
  }

  static mapDataToDTO(data: ICreateTypeData | IUpdateTypeData): ITypeDTO {
    switch (data.kind) {
      case ITypeKind.InterfaceType:
        return {
          ...data,
          __typename: data.kind,
          fields: [],
          owner: {
            auth0Id: data.owner.auth0Id,
            // TODO: This assumption might be wrong, check it out!
            id: data.owner.auth0Id,
          },
        } as IInterfaceTypeDTO

      case ITypeKind.ArrayType:
        return {
          ...data,
          __typename: data.kind,
          itemType: {
            id: data.arrayTypeId as string,
            name: '',
          },
        } as IArrayTypeDTO

      case ITypeKind.UnionType:
        return {
          ...data,
          __typename: data.kind,
          typesOfUnionType: data.unionTypeIds?.map((id) => ({
            id,
            name: '',
          })),
        } as IUnionTypeDTO

      default:
        return { ...data, __typename: data.kind } as ITypeDTO
    }
  }
}
