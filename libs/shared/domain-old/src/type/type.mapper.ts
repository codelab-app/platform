import type { IMapper, ITypeDto } from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'

import type {
  ITypeCreateInput,
  ITypeDeleteInput,
  ITypeUpdateInput,
  ITypeUpdateVars,
} from './type.input.interface'

import { connectNodeId, connectOwner } from '../orm'
import { makeAllTypes } from './type-input.factory'

export const typeMapper: IMapper<
  ITypeDto,
  ITypeCreateInput,
  ITypeUpdateVars,
  ITypeDeleteInput
> = {
  toCreateInput: (dto: ITypeDto): ITypeCreateInput => {
    const baseType = {
      id: dto.id,
      kind: dto.kind,
      name: dto.name,
      owner: connectOwner(dto.owner),
    }

    switch (dto.__typename) {
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
          itemType: connectNodeId(dto.itemType?.id),
        }
      case ITypeKind.CodeMirrorType:
        return {
          ...baseType,
          language: dto.language,
        }
      case ITypeKind.ElementType:
        return {
          ...baseType,
          elementKind: dto.elementKind,
        }
      case ITypeKind.EnumType:
        return {
          ...baseType,
          allowedValues: {
            create: dto.allowedValues.map((value) => ({
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
          primitiveKind: dto.primitiveKind,
        }
      case ITypeKind.UnionType:
        return {
          ...baseType,
          typesOfUnionType: makeAllTypes({
            connect: dto.typesOfUnionType.map((unionTypeId) => ({
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

  /**
   * Where is mapped in later
   */
  toUpdateInput: (dto: ITypeDto): ITypeUpdateVars => {
    const baseType = {
      id: dto.id,
      kind: dto.kind,
      name: dto.name,
      owner: connectOwner(dto.owner),
    }

    switch (dto.__typename) {
      case ITypeKind.ActionType:
      case ITypeKind.AppType:
      case ITypeKind.InterfaceType:
      case ITypeKind.LambdaType:
      case ITypeKind.PageType:
      case ITypeKind.ReactNodeType:
      case ITypeKind.RenderPropType:
      case ITypeKind.RichTextType:
        return {
          update: baseType,
        }
      case ITypeKind.ArrayType:
        return {
          update: dto.itemType?.id
            ? {
                ...baseType,
                itemType: {
                  ...connectNodeId(dto.itemType.id),
                  disconnect: dto.itemType.id
                    ? {
                        where: {
                          NOT: {
                            node: {
                              id: dto.itemType.id,
                            },
                          },
                        },
                      }
                    : undefined,
                },
              }
            : baseType,
        }
      case ITypeKind.CodeMirrorType:
        return {
          update: {
            ...baseType,
            language: dto.language,
          },
        }
      case ITypeKind.ElementType:
        return {
          update: {
            ...baseType,
            elementKind: dto.elementKind,
          },
        }
      case ITypeKind.EnumType:
        return {
          update: {
            ...baseType,
            allowedValues: [
              {
                // For some reason if the disconnect and delete are in the update section it throws an error
                delete: [
                  {
                    where: {
                      node: {
                        NOT: {
                          id_IN: dto.allowedValues.map((av) => av.id),
                        },
                      },
                    },
                  },
                ],
              },
              {
                create: dto.allowedValues.map((value) => ({
                  node: {
                    id: value.id,
                    key: value.key,
                    value: value.value,
                  },
                })),
              },
            ],
          },
        }
      case ITypeKind.PrimitiveType:
        return {
          update: {
            ...baseType,
            primitiveKind: dto.primitiveKind,
          },
        }
      case ITypeKind.UnionType:
        return {
          update: {
            ...baseType,
            typesOfUnionType: makeAllTypes({
              connect: dto.typesOfUnionType.map(({ id }) => ({
                where: { node: { id } },
              })),
              disconnect: {
                typesOfUnionType: makeAllTypes({
                  where: {
                    node: {
                      id_NOT_IN: dto.typesOfUnionType.map(({ id }) => id),
                    },
                  },
                }),
              },
            }),
          },
        }

      default:
        throw new Error('Unsupported type kind')
    }
  },
}
