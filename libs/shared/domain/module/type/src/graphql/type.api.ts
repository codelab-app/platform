import type { IRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  CodeMirrorTypeCreateInput,
  ElementTypeCreateInput,
  PrimitiveTypeCreateInput,
  ReactNodeTypeCreateInput,
} from '@codelab/shared-infra-gqlgen'
import type { ArrayOrSingle } from 'ts-essentials'

import { ITypeKind } from '@codelab/shared-abstract-core'
import { graphqlClient } from '@codelab/shared-infra-gql-client'

import type { ITypeCreateInput, ITypeUpdateVars } from '../type.input.interface'
import type { ITypeWhere } from '../type.where.interface'

import { getSdk as getCreateSdk } from './create-type.api.graphql.api.gen'
import {
  CreateActionTypes,
  CreateAppTypes,
  CreateArrayTypes,
  CreateCodeMirrorTypes,
  CreateElementTypes,
  CreateEnumTypes,
  CreateInterfaceTypes,
  CreateLambdaTypes,
  CreatePageTypes,
  CreatePrimitiveTypes,
  CreateReactNodeTypes,
  CreateRenderPropTypes,
  CreateRichTextTypes,
  CreateUnionTypes,
} from './create-type.api.graphql.web.gen'
import { getSdk as getDeleteSdk } from './delete-type.api.graphql.api.gen'
import {
  DeleteActionTypes,
  DeleteAppTypes,
  DeleteArrayTypes,
  DeleteCodeMirrorTypes,
  DeleteElementTypes,
  DeleteEnumTypes,
  DeleteInterfaceTypes,
  DeleteLambdaTypes,
  DeletePageTypes,
  DeletePrimitiveTypes,
  DeleteReactNodeTypes,
  DeleteRenderPropTypes,
  DeleteRichTextTypes,
  DeleteUnionTypes,
} from './delete-type.api.graphql.web.gen'
import { getSdk as getFindSdk } from './get-type.api.graphql.api.gen'
import {
  GetBaseTypes,
  GetDescendants,
  GetTypes,
} from './get-type.api.graphql.web.gen'
import {
  GetTypeReferences,
  IsTypeDescendantOf,
} from './type.api.graphql.web.gen'
import { getSdk as getUpdateSdk } from './update-type.api.graphql.api.gen'
import {
  UpdateActionTypes,
  UpdateAppTypes,
  UpdateArrayTypes,
  UpdateCodeMirrorTypes,
  UpdateElementTypes,
  UpdateEnumTypes,
  UpdateInterfaceTypes,
  UpdateLambdaTypes,
  UpdatePageTypes,
  UpdatePrimitiveTypes,
  UpdateReactNodeTypes,
  UpdateRenderPropTypes,
  UpdateRichTextTypes,
  UpdateUnionTypes,
} from './update-type.api.graphql.web.gen'

// Neo4j provides us with a way to query/mutate each individual type but not all of them at once.
// so here are a collection of helper functions that allow us to universally query/mutate a type, based on its type kind

type CreateTypes = Record<
  ITypeKind,
  (
    input: Array<ITypeCreateInput>,
    next?: NextFetchOptions,
  ) => Promise<Array<IRef>>
>

export const createTypeServerActions: CreateTypes = {
  [ITypeKind.ActionType]: (input, next) =>
    CreateActionTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.AppType]: (input, next) =>
    CreateAppTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (input, next) =>
    CreateArrayTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (input, next) =>
    CreateCodeMirrorTypes(
      {
        input: input as ArrayOrSingle<CodeMirrorTypeCreateInput>,
      },
      next,
    ).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (input, next) =>
    CreateElementTypes(
      {
        input: input as ArrayOrSingle<ElementTypeCreateInput>,
      },
      next,
    ).then(({ types }) => types.types),
  [ITypeKind.EnumType]: (input, next) =>
    CreateEnumTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (input, next) =>
    CreateInterfaceTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (input, next) =>
    CreateLambdaTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.PageType]: (input, next) =>
    CreatePageTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (input, next) =>
    CreatePrimitiveTypes(
      {
        input: input as ArrayOrSingle<PrimitiveTypeCreateInput>,
      },
      next,
    ).then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (input, next) =>
    CreateReactNodeTypes(
      {
        input: input as ArrayOrSingle<ReactNodeTypeCreateInput>,
      },
      next,
    ).then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (input, next) =>
    CreateRenderPropTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.RichTextType]: (input, next) =>
    CreateRichTextTypes({ input }, next).then(({ types }) => types.types),
  [ITypeKind.UnionType]: (input, next) =>
    CreateUnionTypes({ input }, next).then(({ types }) => types.types),
}

export const findTypeServerActions = {
  GetBaseTypes,
  GetDescendants,
  GetTypeReferences,
  GetTypes,
  IsTypeDescendantOf,
}

export const getAllTypes = async (
  // where?: BaseTypeWhere
  ids?: Array<string>,
  next?: NextFetchOptions,
) => {
  const {
    actionTypes,
    appTypes,
    arrayTypes,
    codeMirrorTypes,
    elementTypes,
    enumTypes,
    interfaceTypes,
    lambdaTypes,
    pageTypes,
    primitiveTypes,
    reactNodeTypes,
    renderPropTypes,
    richTextTypes,
    unionTypes,
  } = await GetTypes({ ids }, next)

  return [
    ...primitiveTypes,
    ...arrayTypes,
    ...unionTypes,
    ...interfaceTypes,
    ...elementTypes,
    ...renderPropTypes,
    ...reactNodeTypes,
    ...richTextTypes,
    ...enumTypes,
    ...lambdaTypes,
    ...pageTypes,
    ...appTypes,
    ...actionTypes,
    ...codeMirrorTypes,
  ]
}

//
// Update
//

type UpdateTypesRecord = Record<
  ITypeKind,
  (vars: ITypeUpdateVars, next?: NextFetchOptions) => Promise<Array<IRef>>
>

export const updateTypeServerActions: UpdateTypesRecord = {
  [ITypeKind.ActionType]: (vars, next) =>
    UpdateActionTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.AppType]: (vars, next) =>
    UpdateAppTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (vars, next) =>
    UpdateArrayTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (vars, next) =>
    UpdateCodeMirrorTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (vars, next) =>
    UpdateElementTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.EnumType]: (vars, next) =>
    UpdateEnumTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (vars, next) =>
    UpdateInterfaceTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (vars, next) =>
    UpdateLambdaTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.PageType]: (vars, next) =>
    UpdatePageTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (vars, next) =>
    UpdatePrimitiveTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (vars, next) =>
    UpdateReactNodeTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (vars, next) =>
    UpdateRenderPropTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.RichTextType]: (vars, next) =>
    UpdateRichTextTypes(vars, next).then(({ types }) => types.types),
  [ITypeKind.UnionType]: (vars, next) =>
    UpdateUnionTypes(vars, next).then(({ types }) => types.types),
}

//
// Delete
//

type DeleteTypesRecord = Record<
  ITypeKind,
  (
    vars: {
      where: ITypeWhere
    },
    next?: NextFetchOptions,
  ) => Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
>

export const deleteTypeServerActions: DeleteTypesRecord = {
  [ITypeKind.ActionType]: (vars, next) =>
    DeleteActionTypes(vars, next).then((results) => results.deleteActionTypes),
  [ITypeKind.AppType]: (vars, next) =>
    DeleteAppTypes(vars, next).then((results) => results.deleteAppTypes),
  [ITypeKind.ArrayType]: (vars, next) =>
    DeleteArrayTypes(vars, next).then((results) => results.deleteArrayTypes),
  [ITypeKind.CodeMirrorType]: (vars, next) =>
    DeleteCodeMirrorTypes(vars, next).then(
      (results) => results.deleteCodeMirrorTypes,
    ),
  [ITypeKind.ElementType]: (vars, next) =>
    DeleteElementTypes(vars, next).then(
      (results) => results.deleteElementTypes,
    ),
  [ITypeKind.EnumType]: (vars, next) =>
    DeleteEnumTypes(vars, next).then((results) => results.deleteEnumTypes),
  [ITypeKind.InterfaceType]: (vars, next) =>
    DeleteInterfaceTypes(vars, next).then(
      (results) => results.deleteInterfaceTypes,
    ),
  [ITypeKind.LambdaType]: (vars, next) =>
    DeleteLambdaTypes(vars, next).then((results) => results.deleteLambdaTypes),
  [ITypeKind.PageType]: (vars, next) =>
    DeletePageTypes(vars, next).then((results) => results.deletePageTypes),
  [ITypeKind.PrimitiveType]: (vars, next) =>
    DeletePrimitiveTypes(vars, next).then(
      (results) => results.deletePrimitiveTypes,
    ),
  [ITypeKind.ReactNodeType]: (vars, next) =>
    DeleteReactNodeTypes(vars, next).then(
      (results) => results.deleteReactNodeTypes,
    ),
  [ITypeKind.RenderPropType]: (vars, next) =>
    DeleteRenderPropTypes(vars, next).then(
      (results) => results.deleteRenderPropTypes,
    ),
  [ITypeKind.RichTextType]: (vars, next) =>
    DeleteRichTextTypes(vars, next).then(
      (results) => results.deleteRichTextTypes,
    ),
  [ITypeKind.UnionType]: (vars, next) =>
    DeleteUnionTypes(vars, next).then((results) => results.deleteUnionTypes),
}

export const createTypeApi = () => getCreateSdk(graphqlClient)
export const updateTypeApi = () => getUpdateSdk(graphqlClient)
export const deleteTypeApi = () => getDeleteSdk(graphqlClient)
export const findTypeApi = () => getFindSdk(graphqlClient)
