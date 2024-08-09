import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { TypeKind } from '@codelab/shared/infra/gql'
import type {
  IArrayTypeDto,
  ICreateTypeDto,
  IInterfaceTypeDto,
  ITypeDto,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { ActionType } from './action-type.model'
import { AppType } from './app-type.model'
import { ArrayType } from './array-type.model'
import { CodeMirrorType } from './code-mirror-type.model'
import { ElementType } from './element-type.model'
import { EnumType } from './enum-type.model'
import { InterfaceType } from './interface-type.model'
import { LambdaType } from './lambda-type.model'
import { PageType } from './page-type.model'
import { PrimitiveType } from './primitive-type.model'
import { ReactNodeType } from './react-node-type.model'
import { RenderPropType } from './render-prop-type.model'
import { RichTextType } from './rich-text-type.model'
import { UnionType } from './union-type.model'

export class TypeFactory {
  static create(typeDto: ITypeDto): ITypeModel {
    switch (typeDto.__typename) {
      case ITypeKind.AppType:
        return AppType.create(typeDto)

      case ITypeKind.ActionType:
        return ActionType.create(typeDto)

      case ITypeKind.RichTextType:
        return RichTextType.create(typeDto)

      case ITypeKind.ElementType:
        return ElementType.create(typeDto)

      case ITypeKind.EnumType:
        return EnumType.create(typeDto)

      case ITypeKind.LambdaType:
        return LambdaType.create(typeDto)

      case ITypeKind.CodeMirrorType:
        return CodeMirrorType.create(typeDto)

      case ITypeKind.PageType:
        return PageType.create(typeDto)

      case ITypeKind.PrimitiveType:
        return PrimitiveType.create(typeDto)

      case ITypeKind.ReactNodeType:
        return ReactNodeType.create(typeDto)

      case ITypeKind.RenderPropType:
        return RenderPropType.create(typeDto)

      case ITypeKind.ArrayType:
        return ArrayType.create(typeDto)

      case TypeKind.InterfaceType:
        return InterfaceType.create(typeDto)

      case TypeKind.UnionType:
        return UnionType.create(typeDto)

      default:
        throw new Error(`Unknown type kind: ${typeDto.kind}`)
    }
  }

  static mapDataToDTO(data: ICreateTypeDto): ITypeDto {
    switch (data.kind) {
      case ITypeKind.InterfaceType:
        return {
          ...data,
          __typename: data.kind,
          fields: [],
        } as IInterfaceTypeDto

      case ITypeKind.ArrayType:
        return {
          ...data,
          __typename: data.kind,
          itemType: {
            id: data.arrayTypeId as string,
          },
        } as IArrayTypeDto

      case ITypeKind.UnionType:
        return {
          ...data,
          __typename: data.kind,
          typesOfUnionType: data.unionTypeIds?.map((id) => ({
            id,
          })),
        } as IUnionTypeDto

      default:
        return { ...data, __typename: data.kind } as ITypeDto
    }
  }

  static writeCache(typeDto: ITypeDto, model: ITypeModel): ITypeModel {
    switch (typeDto.__typename) {
      case ITypeKind.AppType:
        model.kind === ITypeKind.AppType && model.writeCache(typeDto)

        return model

      case ITypeKind.ActionType:
        model.kind === ITypeKind.ActionType && model.writeCache(typeDto)

        return model

      case ITypeKind.ElementType:
        model.kind === ITypeKind.ElementType && model.writeCache(typeDto)

        return model

      case ITypeKind.EnumType:
        model.kind === ITypeKind.EnumType && model.writeCache(typeDto)

        return model

      case ITypeKind.LambdaType:
        model.kind === ITypeKind.LambdaType && model.writeCache(typeDto)

        return model

      case ITypeKind.CodeMirrorType:
        model.kind === ITypeKind.CodeMirrorType && model.writeCache(typeDto)

        return model

      case ITypeKind.PageType:
        model.kind === ITypeKind.PageType && model.writeCache(typeDto)

        return model

      case ITypeKind.PrimitiveType:
        model.kind === ITypeKind.PrimitiveType && model.writeCache(typeDto)

        return model

      case ITypeKind.ReactNodeType:
        model.kind === ITypeKind.ReactNodeType && model.writeCache(typeDto)

        return model

      case ITypeKind.RichTextType:
        model.kind === ITypeKind.RichTextType && model.writeCache(typeDto)

        return model

      case ITypeKind.RenderPropType:
        model.kind === ITypeKind.RenderPropType && model.writeCache(typeDto)

        return model

      case ITypeKind.ArrayType:
        model.kind === ITypeKind.ArrayType && model.writeCache(typeDto)

        return model

      case TypeKind.InterfaceType:
        model.kind === TypeKind.InterfaceType && model.writeCache(typeDto)

        return model

      case TypeKind.UnionType:
        model.kind === TypeKind.UnionType && model.writeCache(typeDto)

        return model

      default:
        throw new Error(`Unknown type kind: ${typeDto.kind}`)
    }
  }
}
