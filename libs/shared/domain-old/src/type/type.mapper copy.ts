import type { IMapper, IUserDto } from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'

import type {
  ITypeCreateInput,
  ITypeDeleteInput,
  ITypeUpdateInput,
} from './type.input.interface'

import { connectNodeId, connectOwner } from '../orm'
import { makeAllTypes } from './type-input.factory'

export const typeMapper: IMapper<
  ITypeCreateDto,
  ITypeCreateInput,
  ITypeUpdateInput,
  ITypeDeleteInput
> = {
  toCreateInput: (
    {
      allowedValues,
      arrayItemTypeId,
      elementKind,
      id,
      kind,
      language,
      name,
      primitiveKind,
      unionTypeIds,
    }: ITypeCreateDto,
    owner: IUserDto,
    ...args: Array<unknown>
  ): ITypeCreateInput => {
    const baseType = {
      id,
      kind,
      name,
      owner: connectOwner(owner),
    }

    switch (kind) {
      case ITypeKind.ActionType:
      case ITypeKind.AppType:
      case ITypeKind.InterfaceType:
      case ITypeKind.LambdaType:
      case ITypeKind.PageType:
      case ITypeKind.ReactNodeType:
      case ITypeKind.RenderPropType:
      case ITypeKind.RichTextType:
        return baseType

      case ITypeKind.ArrayType:
        return {
          ...baseType,
          itemType: connectNodeId(arrayItemTypeId),
        }
      case ITypeKind.CodeMirrorType:
        return {
          ...baseType,
          language,
        }
      case ITypeKind.ElementType:
        return {
          ...baseType,
          elementKind,
        }
      case ITypeKind.EnumType:
        return {
          ...baseType,
          allowedValues: {
            create: allowedValues?.map((value) => ({
              node: {
                id: value.id,
                key: value.key,
                value: value.value,
              },
            })),
          },
        }
      case ITypeKind.PrimitiveType:
        return {
          ...baseType,
          primitiveKind,
        }
      case ITypeKind.UnionType:
        return {
          ...baseType,
          typesOfUnionType: makeAllTypes({
            connect: unionTypeIds?.map((unionTypeId) => ({
              where: { node: { id: unionTypeId } },
            })),
          }),
        }
      default:
        throw new Error('Unsupported type kind')
    }
  },

  toDeleteInput: (kind: ITypeKind): ITypeDeleteInput => {
    const baseType = {}

    switch (kind) {
      case ITypeKind.ActionType:
      case ITypeKind.AppType:
      case ITypeKind.CodeMirrorType:
      case ITypeKind.ElementType:
      case ITypeKind.InterfaceType:
      case ITypeKind.LambdaType:
      case ITypeKind.PageType:
      case ITypeKind.PrimitiveType:
      case ITypeKind.ReactNodeType:
      case ITypeKind.RenderPropType:
      case ITypeKind.RichTextType:
      case ITypeKind.UnionType:
        return baseType

      case ITypeKind.ArrayType:
        return {
          ...baseType,
          itemType: { where: {} },
        }
      case ITypeKind.EnumType:
        return {
          ...baseType,
          allowedValues: [{ where: {} }],
        }

      default:
        throw new Error('Unsupported type kind')
    }
  },

  toUpdateInput: (dto: ITypeUpdateDto): ITypeUpdateInput => {
    return {}
  },
}
