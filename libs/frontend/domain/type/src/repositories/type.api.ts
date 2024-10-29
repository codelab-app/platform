import type { ITypeWhere } from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type {
  ITypeCreateInput,
  ITypeUpdateVars,
} from '@codelab/shared/domain-old'
import type {
  CodeMirrorTypeCreateInput,
  ElementTypeCreateInput,
  PrimitiveTypeCreateInput,
  ReactNodeTypeCreateInput,
} from '@codelab/shared/infra/gql'
import type { ArrayOrSingle } from 'ts-essentials'

import { ITypeKind } from '@codelab/shared/abstract/core'

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
} from './create-type.api.graphql.gen'
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
} from './delete-type.api.graphql.gen'
import { GetTypes } from './get-type.api.graphql.gen'
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
} from './update-type.api.graphql.gen'

// Neo4j provides us with a way to query/mutate each individual type but not all of them at once.
// so here are a collection of helper functions that allow us to universally query/mutate a type, based on its type kind

type CreateTypesRecord = Record<
  ITypeKind,
  (input: Array<ITypeCreateInput>) => Promise<Array<IRef>>
>

export const createTypeApi: CreateTypesRecord = {
  [ITypeKind.ActionType]: (input) =>
    CreateActionTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.AppType]: (input) =>
    CreateAppTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (input) =>
    CreateArrayTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (input) =>
    CreateCodeMirrorTypes({
      input: input as ArrayOrSingle<CodeMirrorTypeCreateInput>,
    }).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (input) =>
    CreateElementTypes({
      input: input as ArrayOrSingle<ElementTypeCreateInput>,
    }).then(({ types }) => types.types),
  [ITypeKind.EnumType]: (input) =>
    CreateEnumTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (input) =>
    CreateInterfaceTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (input) =>
    CreateLambdaTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.PageType]: (input) =>
    CreatePageTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (input) =>
    CreatePrimitiveTypes({
      input: input as ArrayOrSingle<PrimitiveTypeCreateInput>,
    }).then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (input) =>
    CreateReactNodeTypes({
      input: input as ArrayOrSingle<ReactNodeTypeCreateInput>,
    }).then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (input) =>
    CreateRenderPropTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.RichTextType]: (input) =>
    CreateRichTextTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.UnionType]: (input) =>
    CreateUnionTypes({ input }).then(({ types }) => types.types),
}

export const getAllTypes = async (
  // where?: BaseTypeWhere
  ids?: Array<string>,
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
  } = await GetTypes({ ids })

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
  (vars: ITypeUpdateVars) => Promise<Array<IRef>>
>

export const updateTypeApi: UpdateTypesRecord = {
  [ITypeKind.ActionType]: (vars) =>
    UpdateActionTypes(vars).then(({ types }) => types.types),
  [ITypeKind.AppType]: (vars) =>
    UpdateAppTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (vars) =>
    UpdateArrayTypes(vars).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (vars) =>
    UpdateCodeMirrorTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (vars) =>
    UpdateElementTypes(vars).then(({ types }) => types.types),
  [ITypeKind.EnumType]: (vars) =>
    UpdateEnumTypes(vars).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (vars) =>
    UpdateInterfaceTypes(vars).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (vars) =>
    UpdateLambdaTypes(vars).then(({ types }) => types.types),
  [ITypeKind.PageType]: (vars) =>
    UpdatePageTypes(vars).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (vars) =>
    UpdatePrimitiveTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (vars) =>
    UpdateReactNodeTypes(vars).then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (vars) =>
    UpdateRenderPropTypes(vars).then(({ types }) => types.types),
  [ITypeKind.RichTextType]: (vars) =>
    UpdateRichTextTypes(vars).then(({ types }) => types.types),
  [ITypeKind.UnionType]: (vars) =>
    UpdateUnionTypes(vars).then(({ types }) => types.types),
}

//
// Delete
//

type DeleteTypesRecord = Record<
  ITypeKind,
  (vars: {
    where: ITypeWhere
  }) => Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
>

export const deleteTypeApi: DeleteTypesRecord = {
  [ITypeKind.ActionType]: (vars) =>
    DeleteActionTypes(vars).then((results) => results.deleteActionTypes),
  [ITypeKind.AppType]: (vars) =>
    DeleteAppTypes(vars).then((results) => results.deleteAppTypes),
  [ITypeKind.ArrayType]: (vars) =>
    DeleteArrayTypes(vars).then((results) => results.deleteArrayTypes),
  [ITypeKind.CodeMirrorType]: (vars) =>
    DeleteCodeMirrorTypes(vars).then(
      (results) => results.deleteCodeMirrorTypes,
    ),
  [ITypeKind.ElementType]: (vars) =>
    DeleteElementTypes(vars).then((results) => results.deleteElementTypes),
  [ITypeKind.EnumType]: (vars) =>
    DeleteEnumTypes(vars).then((results) => results.deleteEnumTypes),
  [ITypeKind.InterfaceType]: (vars) =>
    DeleteInterfaceTypes(vars).then((results) => results.deleteInterfaceTypes),
  [ITypeKind.LambdaType]: (vars) =>
    DeleteLambdaTypes(vars).then((results) => results.deleteLambdaTypes),
  [ITypeKind.PageType]: (vars) =>
    DeletePageTypes(vars).then((results) => results.deletePageTypes),
  [ITypeKind.PrimitiveType]: (vars) =>
    DeletePrimitiveTypes(vars).then((results) => results.deletePrimitiveTypes),
  [ITypeKind.ReactNodeType]: (vars) =>
    DeleteReactNodeTypes(vars).then((results) => results.deleteReactNodeTypes),
  [ITypeKind.RenderPropType]: (vars) =>
    DeleteRenderPropTypes(vars).then(
      (results) => results.deleteRenderPropTypes,
    ),
  [ITypeKind.RichTextType]: (vars) =>
    DeleteRichTextTypes(vars).then((results) => results.deleteRichTextTypes),
  [ITypeKind.UnionType]: (vars) =>
    DeleteUnionTypes(vars).then((results) => results.deleteUnionTypes),
}
