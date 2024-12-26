import type * as cg from '@codelab/shared/infra/gql'

/**
 * Put all functions in same file so it's easier for LLM to refactor
 */

import {
  type IActionTypeDto,
  type IAppTypeDto,
  type IArrayTypeDto,
  type ICodeMirrorTypeDto,
  type IElementTypeDto,
  type IEnumTypeDto,
  type IInterfaceTypeDto,
  type ILambdaTypeDto,
  type IMapper,
  type IPageTypeDto,
  type IPrimitiveTypeDto,
  type IReactNodeTypeDto,
  type IRenderPropTypeDto,
  type IRichTextTypeDto,
  ITypeKind,
  type IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectOwner,
  reconnectNodeId,
} from '@codelab/shared/domain/orm'

import {
  connectTypesOfUnionType,
  reconnectTypesOfUnionType,
} from './type-input.factory'

const createOrUpdateActionType = (dto: IActionTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const actionTypeMapper: IMapper<
  IActionTypeDto,
  cg.ActionTypeCreateInput,
  cg.ActionTypeUpdateInput,
  cg.ActionTypeDeleteInput
> = {
  toCreateInput: createOrUpdateActionType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateActionType,
}

const createOrUpdateAppType = (dto: IAppTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const appTypeMapper: IMapper<
  IAppTypeDto,
  cg.AppTypeCreateInput,
  cg.AppTypeUpdateInput,
  cg.AppTypeDeleteInput
> = {
  toCreateInput: createOrUpdateAppType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateAppType,
}

export const arrayTypeMapper: IMapper<
  IArrayTypeDto,
  cg.ArrayTypeCreateInput,
  cg.ArrayTypeUpdateInput,
  cg.ArrayTypeDeleteInput
> = {
  toCreateInput: (dto) => ({
    id: dto.id,
    itemType: connectNodeId(dto.itemType?.id),
    kind: dto.kind,
    name: dto.name,
    owner: connectOwner(dto.owner),
  }),
  toDeleteInput: () => ({
    itemType: { where: {} },
  }),
  toUpdateInput: (dto) => ({
    // Required means we cannot disconnect
    // itemType: reconnectNodeId(dto.itemType?.id),
    name: dto.name,
    owner: connectOwner(dto.owner),
  }),
}

const createOrUpdateCodeMirrorType = (dto: ICodeMirrorTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  language: dto.language,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const codeMirrorTypeMapper: IMapper<
  ICodeMirrorTypeDto,
  cg.CodeMirrorTypeCreateInput,
  cg.CodeMirrorTypeUpdateInput,
  cg.CodeMirrorTypeDeleteInput
> = {
  toCreateInput: createOrUpdateCodeMirrorType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateCodeMirrorType,
}

const createOrUpdateElementType = (dto: IElementTypeDto) => ({
  elementKind: dto.elementKind,
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const elementTypeMapper: IMapper<
  IElementTypeDto,
  cg.ElementTypeCreateInput,
  cg.ElementTypeUpdateInput,
  cg.ElementTypeDeleteInput
> = {
  toCreateInput: createOrUpdateElementType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateElementType,
}

export const enumTypeMapper: IMapper<
  IEnumTypeDto,
  cg.EnumTypeCreateInput,
  cg.EnumTypeUpdateInput,
  cg.EnumTypeDeleteInput
> = {
  toCreateInput: (dto) => ({
    allowedValues: {
      create: dto.allowedValues.map((value) => ({
        node: {
          id: value.id,
          key: value.key,
          value: value.value,
        },
      })),
    },
    id: dto.id,
    kind: dto.kind,
    name: dto.name,
    owner: connectOwner(dto.owner),
  }),
  toDeleteInput: () => ({
    allowedValues: [{ where: {} }],
  }),
  toUpdateInput: (dto) => ({
    allowedValues: [
      {
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
  }),
}

const createOrUpdateInterfaceType = (dto: IInterfaceTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const interfaceTypeMapper: IMapper<
  IInterfaceTypeDto,
  cg.InterfaceTypeCreateInput,
  cg.InterfaceTypeUpdateInput,
  cg.InterfaceTypeDeleteInput
> = {
  toCreateInput: createOrUpdateInterfaceType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateInterfaceType,
}

const createOrUpdateLambdaType = (dto: ILambdaTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const lambdaTypeMapper: IMapper<
  ILambdaTypeDto,
  cg.LambdaTypeCreateInput,
  cg.LambdaTypeUpdateInput,
  cg.LambdaTypeDeleteInput
> = {
  toCreateInput: createOrUpdateLambdaType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateLambdaType,
}

const createOrUpdatePageType = (dto: IPageTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const pageTypeMapper: IMapper<
  IPageTypeDto,
  cg.PageTypeCreateInput,
  cg.PageTypeUpdateInput,
  cg.PageTypeDeleteInput
> = {
  toCreateInput: createOrUpdatePageType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdatePageType,
}

export const primitiveTypeMapper: IMapper<
  IPrimitiveTypeDto,
  cg.PrimitiveTypeCreateInput,
  cg.PrimitiveTypeUpdateInput,
  cg.PrimitiveTypeDeleteInput
> = {
  toCreateInput: (dto) => ({
    id: dto.id,
    kind: dto.kind,
    name: dto.name,
    owner: connectOwner(dto.owner),
    primitiveKind: dto.primitiveKind,
  }),
  toDeleteInput: () => ({}),
  toUpdateInput: (dto) => ({
    primitiveKind: dto.primitiveKind,
  }),
}

const createOrUpdateReactNodeType = (dto: IReactNodeTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const reactNodeTypeMapper: IMapper<
  IReactNodeTypeDto,
  cg.ReactNodeTypeCreateInput,
  cg.ReactNodeTypeUpdateInput,
  cg.ReactNodeTypeDeleteInput
> = {
  toCreateInput: createOrUpdateReactNodeType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateReactNodeType,
}

const createOrUpdateRenderPropType = (dto: IRenderPropTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const renderPropTypeMapper: IMapper<
  IRenderPropTypeDto,
  cg.RenderPropTypeCreateInput,
  cg.RenderPropTypeUpdateInput,
  cg.RenderPropTypeDeleteInput
> = {
  toCreateInput: createOrUpdateRenderPropType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateRenderPropType,
}

const createOrUpdateRichTextType = (dto: IRichTextTypeDto) => ({
  id: dto.id,
  kind: dto.kind,
  name: dto.name,
  owner: connectOwner(dto.owner),
})

export const richTextTypeMapper: IMapper<
  IRichTextTypeDto,
  cg.RichTextTypeCreateInput,
  cg.RichTextTypeUpdateInput,
  cg.RichTextTypeDeleteInput
> = {
  toCreateInput: createOrUpdateRichTextType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateRichTextType,
}

export const unionTypeMapper: IMapper<
  IUnionTypeDto,
  cg.UnionTypeCreateInput,
  cg.UnionTypeUpdateInput,
  cg.UnionTypeDeleteInput
> = {
  toCreateInput: (dto) => {
    const types = connectTypesOfUnionType(dto.typesOfUnionType)

    return {
      id: dto.id,
      kind: dto.kind,
      name: dto.name,
      owner: connectOwner(dto.owner),
      typesOfUnionType: types,
    }
  },
  toDeleteInput: () => ({}),
  toUpdateInput: (dto) => ({
    typesOfUnionType: reconnectTypesOfUnionType(dto.typesOfUnionType),
  }),
}

/**
 * Create a record with ITypeKind as key, and the mapper as value
 */
export const typeMapperRecord = {
  [ITypeKind.ActionType]: actionTypeMapper,
  [ITypeKind.AppType]: appTypeMapper,
  [ITypeKind.ArrayType]: arrayTypeMapper,
  [ITypeKind.CodeMirrorType]: codeMirrorTypeMapper,
  [ITypeKind.ElementType]: elementTypeMapper,
  [ITypeKind.EnumType]: enumTypeMapper,
  [ITypeKind.InterfaceType]: interfaceTypeMapper,
  [ITypeKind.LambdaType]: lambdaTypeMapper,
  [ITypeKind.PageType]: pageTypeMapper,
  [ITypeKind.PrimitiveType]: primitiveTypeMapper,
  [ITypeKind.ReactNodeType]: reactNodeTypeMapper,
  [ITypeKind.RenderPropType]: renderPropTypeMapper,
  [ITypeKind.RichTextType]: richTextTypeMapper,
  [ITypeKind.UnionType]: unionTypeMapper,
}

export interface TypeDtoByKind {
  [ITypeKind.ActionType]: IActionTypeDto
  [ITypeKind.AppType]: IAppTypeDto
  [ITypeKind.ArrayType]: IArrayTypeDto
  [ITypeKind.CodeMirrorType]: ICodeMirrorTypeDto
  [ITypeKind.ElementType]: IElementTypeDto
  [ITypeKind.EnumType]: IEnumTypeDto
  [ITypeKind.InterfaceType]: IInterfaceTypeDto
  [ITypeKind.LambdaType]: ILambdaTypeDto
  [ITypeKind.PageType]: IPageTypeDto
  [ITypeKind.PrimitiveType]: IPrimitiveTypeDto
  [ITypeKind.ReactNodeType]: IReactNodeTypeDto
  [ITypeKind.RenderPropType]: IRenderPropTypeDto
  [ITypeKind.RichTextType]: IRichTextTypeDto
  [ITypeKind.UnionType]: IUnionTypeDto
}
