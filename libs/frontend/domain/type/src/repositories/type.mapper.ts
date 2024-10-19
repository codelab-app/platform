import type {
  IMapper,
  ITypeCreateInput,
  ITypeDeleteInput,
  ITypeUpdateInput,
} from '@codelab/frontend/abstract/domain'
import type { ITypeCreateDto, IUserDto } from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectOwner,
  makeAllTypes,
} from '@codelab/shared/domain-old'

import { createTypeApi } from './type.api'

export class TypeMapper
  implements
    IMapper<
      ITypeCreateDto,
      ITypeCreateInput,
      ITypeUpdateInput,
      ITypeDeleteInput
    >
{
  constructor(private owner: IUserDto) {}

  toCreateInput(
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
    ...args: Array<unknown>
  ): ITypeCreateInput {
    const baseType = {
      id,
      kind,
      name,
      owner: connectOwner(this.owner),
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
  }
}
