import type {
  ActionTypeCreateInput,
  ActionTypeDeleteInput,
  ActionTypeUpdateInput,
  ActionTypeWhere,
  AppTypeCreateInput,
  AppTypeDeleteInput,
  AppTypeUpdateInput,
  AppTypeWhere,
  ArrayTypeCreateInput,
  ArrayTypeDeleteInput,
  ArrayTypeUpdateInput,
  ArrayTypeWhere,
  CodeMirrorTypeCreateInput,
  CodeMirrorTypeDeleteInput,
  CodeMirrorTypeUpdateInput,
  CodeMirrorTypeWhere,
  ElementTypeCreateInput,
  ElementTypeDeleteInput,
  ElementTypeUpdateInput,
  ElementTypeWhere,
  EnumTypeCreateInput,
  EnumTypeDeleteInput,
  EnumTypeUpdateInput,
  EnumTypeWhere,
  InterfaceTypeCreateInput,
  InterfaceTypeDeleteInput,
  InterfaceTypeUpdateInput,
  InterfaceTypeWhere,
  LambdaTypeCreateInput,
  LambdaTypeDeleteInput,
  LambdaTypeUpdateInput,
  LambdaTypeWhere,
  PageTypeCreateInput,
  PageTypeDeleteInput,
  PageTypeUpdateInput,
  PageTypeWhere,
  PrimitiveTypeCreateInput,
  PrimitiveTypeDeleteInput,
  PrimitiveTypeUpdateInput,
  PrimitiveTypeWhere,
  ReactNodeTypeCreateInput,
  ReactNodeTypeDeleteInput,
  ReactNodeTypeUpdateInput,
  ReactNodeTypeWhere,
  RenderPropTypeCreateInput,
  RenderPropTypeDeleteInput,
  RenderPropTypeUpdateInput,
  RenderPropTypeWhere,
  RichTextTypeCreateInput,
  RichTextTypeDeleteInput,
  RichTextTypeUpdateInput,
  RichTextTypeWhere,
  UnionTypeCreateInput,
  UnionTypeDeleteInput,
  UnionTypeUpdateInput,
  UnionTypeWhere,
  UpdateActionTypesMutationVariables,
  UpdateAppTypesMutationVariables,
  UpdateArrayTypesMutationVariables,
  UpdateCodeMirrorTypesMutationVariables,
  UpdateElementTypesMutationVariables,
  UpdateEnumTypesMutationVariables,
  UpdateInterfaceTypesMutationVariables,
  UpdateLambdaTypesMutationVariables,
  UpdatePageTypesMutationVariables,
  UpdatePrimitiveTypesMutationVariables,
  UpdateReactNodeTypesMutationVariables,
  UpdateRenderPropTypesMutationVariables,
  UpdateRichTextTypesMutationVariables,
  UpdateUnionTypesMutationVariables,
} from '@codelab/shared/infra/gqlgen'

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
import { connectNodeId, connectOwner } from '@codelab/shared/domain/orm'

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
  ActionTypeCreateInput,
  ActionTypeUpdateInput,
  ActionTypeDeleteInput
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
  AppTypeCreateInput,
  AppTypeUpdateInput,
  AppTypeDeleteInput
> = {
  toCreateInput: createOrUpdateAppType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateAppType,
}

export const arrayTypeMapper: IMapper<
  IArrayTypeDto,
  ArrayTypeCreateInput,
  ArrayTypeUpdateInput,
  ArrayTypeDeleteInput
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
    // itemType: disconnectNodeId(dto.itemType?.id),
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
  CodeMirrorTypeCreateInput,
  CodeMirrorTypeUpdateInput,
  CodeMirrorTypeDeleteInput
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
  ElementTypeCreateInput,
  ElementTypeUpdateInput,
  ElementTypeDeleteInput
> = {
  toCreateInput: createOrUpdateElementType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateElementType,
}

export const enumTypeMapper: IMapper<
  IEnumTypeDto,
  EnumTypeCreateInput,
  EnumTypeUpdateInput,
  EnumTypeDeleteInput
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
              node: {},
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
    name: dto.name,
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
  InterfaceTypeCreateInput,
  InterfaceTypeUpdateInput,
  InterfaceTypeDeleteInput
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
  LambdaTypeCreateInput,
  LambdaTypeUpdateInput,
  LambdaTypeDeleteInput
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
  PageTypeCreateInput,
  PageTypeUpdateInput,
  PageTypeDeleteInput
> = {
  toCreateInput: createOrUpdatePageType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdatePageType,
}

export const primitiveTypeMapper: IMapper<
  IPrimitiveTypeDto,
  PrimitiveTypeCreateInput,
  PrimitiveTypeUpdateInput,
  PrimitiveTypeDeleteInput
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
  ReactNodeTypeCreateInput,
  ReactNodeTypeUpdateInput,
  ReactNodeTypeDeleteInput
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
  RenderPropTypeCreateInput,
  RenderPropTypeUpdateInput,
  RenderPropTypeDeleteInput
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
  RichTextTypeCreateInput,
  RichTextTypeUpdateInput,
  RichTextTypeDeleteInput
> = {
  toCreateInput: createOrUpdateRichTextType,
  toDeleteInput: () => ({}),
  toUpdateInput: createOrUpdateRichTextType,
}

export const unionTypeMapper: IMapper<
  IUnionTypeDto,
  UnionTypeCreateInput,
  UnionTypeUpdateInput,
  UnionTypeDeleteInput
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
    name: dto.name,
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
