import type {
  ICreateTypeInput,
  ITypeWhere,
  IUpdateTypeVars,
} from '@codelab/frontend/abstract/core'
import { client } from '@codelab/frontend/presentation/client/graphql'
import type {
  CodeMirrorTypeCreateInput,
  ElementTypeCreateInput,
  PrimitiveTypeCreateInput,
  ReactNodeTypeCreateInput,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity, UnboxArray } from '@codelab/shared/abstract/types'
import type { ArrayOrSingle } from 'ts-essentials'
import { getSdk as getCreateSdk } from '../../graphql/create-type.endpoints.graphql.gen'
import { getSdk as getDeleteSdk } from '../../graphql/delete-type.endpoints.graphql.gen'
import type { GetTypesQuery } from '../../graphql/get-type.endpoints.graphql.gen'
import { getSdk as getGetSdk } from '../../graphql/get-type.endpoints.graphql.gen'
import { getSdk } from '../../graphql/type.endpoints.graphql.gen'
import { getSdk as getUpdateSdk } from '../../graphql/update-type.endpoints.graphql.gen'

// Neo4j provides us with a way to query/mutate each individual type but not all of them at once.
// so here are a collection of helper functions that allow us to universally query/mutate a type, based on its type kind

export const typeApi = getSdk(client)

//
// Create
//
const _createApi = getCreateSdk(client)

type CreateTypesRecord = Record<
  ITypeKind,
  (input: Array<ICreateTypeInput>) => Promise<Array<IEntity>>
>

export const createTypeApi: CreateTypesRecord = {
  [ITypeKind.AppType]: (input) =>
    _createApi.CreateAppTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.ActionType]: (input) =>
    _createApi.CreateActionTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (input) =>
    _createApi
      .CreatePrimitiveTypes({
        input: input as ArrayOrSingle<PrimitiveTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (input) =>
    _createApi.CreateArrayTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (input) =>
    _createApi
      .CreateInterfaceTypes({ input: input })
      .then(({ types }) => types.types),
  [ITypeKind.EnumType]: (input) =>
    _createApi.CreateEnumTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (input) =>
    _createApi.CreateLambdaTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (input) =>
    _createApi
      .CreateElementTypes({
        input: input as ArrayOrSingle<ElementTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (input) =>
    _createApi
      .CreateRenderPropTypes({ input })
      .then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (input) =>
    _createApi
      .CreateReactNodeTypes({
        input: input as ArrayOrSingle<ReactNodeTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.UnionType]: (input) =>
    _createApi.CreateUnionTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (input) =>
    _createApi
      .CreateCodeMirrorTypes({
        input: input as ArrayOrSingle<CodeMirrorTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.PageType]: (input) =>
    _createApi.CreatePageTypes({ input }).then(({ types }) => types.types),
}

export const getTypeApi = getGetSdk(client)

export const getAllTypes = async (
  ids?: Array<string>,
): Promise<Array<UnboxArray<GetTypesQuery[keyof GetTypesQuery]>>> => {
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
    unionTypes,
  } = await getTypeApi.GetTypes({ ids })

  return [
    ...primitiveTypes,
    ...arrayTypes,
    ...unionTypes,
    ...interfaceTypes,
    ...elementTypes,
    ...renderPropTypes,
    ...reactNodeTypes,
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
const _updateApi = getUpdateSdk(client)

type UpdateTypesRecord = Record<
  ITypeKind,
  (vars: IUpdateTypeVars) => Promise<Array<IEntity>>
>

export const updateTypeApi: UpdateTypesRecord = {
  [ITypeKind.AppType]: (vars) =>
    _updateApi.UpdateAppTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ActionType]: (vars) =>
    _updateApi.UpdateActionTypes(vars).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (vars) =>
    _updateApi.UpdatePrimitiveTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (vars) =>
    _updateApi.UpdateArrayTypes(vars).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (vars) =>
    _updateApi.UpdateInterfaceTypes(vars).then(({ types }) => types.types),
  [ITypeKind.EnumType]: (vars) =>
    _updateApi.UpdateEnumTypes(vars).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (vars) =>
    _updateApi.UpdateLambdaTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (vars) =>
    _updateApi.UpdateElementTypes(vars).then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (vars) =>
    _updateApi.UpdateRenderPropTypes(vars).then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (vars) =>
    _updateApi.UpdateReactNodeTypes(vars).then(({ types }) => types.types),
  [ITypeKind.UnionType]: (vars) =>
    _updateApi.UpdateUnionTypes(vars).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (vars) =>
    _updateApi.UpdateCodeMirrorTypes(vars).then(({ types }) => types.types),
  [ITypeKind.PageType]: (vars) =>
    _updateApi.UpdatePageTypes(vars).then(({ types }) => types.types),
}

//
// Delete
//
const _deleteApi = getDeleteSdk(client)

type DeleteTypesRecord = Record<
  ITypeKind,
  (vars: {
    where: ITypeWhere
  }) => Promise<{ nodesDeleted: number; relationshipsDeleted: number }>
>

export const deleteTypeApi: DeleteTypesRecord = {
  [ITypeKind.AppType]: (vars) =>
    _deleteApi.DeleteAppTypes(vars).then((results) => results.deleteAppTypes),
  [ITypeKind.ActionType]: (vars) =>
    _deleteApi
      .DeleteActionTypes(vars)
      .then((results) => results.deleteActionTypes),
  [ITypeKind.PrimitiveType]: (vars) =>
    _deleteApi
      .DeletePrimitiveTypes(vars)
      .then((results) => results.deletePrimitiveTypes),
  [ITypeKind.ArrayType]: (vars) =>
    _deleteApi
      .DeleteArrayTypes(vars)
      .then((results) => results.deleteArrayTypes),
  [ITypeKind.InterfaceType]: (vars) =>
    _deleteApi
      .DeleteInterfaceTypes(vars)
      .then((results) => results.deleteInterfaceTypes),
  [ITypeKind.EnumType]: (vars) =>
    _deleteApi.DeleteEnumTypes(vars).then((results) => results.deleteEnumTypes),
  [ITypeKind.LambdaType]: (vars) =>
    _deleteApi
      .DeleteLambdaTypes(vars)
      .then((results) => results.deleteLambdaTypes),
  [ITypeKind.ElementType]: (vars) =>
    _deleteApi
      .DeleteElementTypes(vars)
      .then((results) => results.deleteElementTypes),
  [ITypeKind.RenderPropType]: (vars) =>
    _deleteApi
      .DeleteRenderPropTypes(vars)
      .then((results) => results.deleteRenderPropTypes),
  [ITypeKind.ReactNodeType]: (vars) =>
    _deleteApi
      .DeleteReactNodeTypes(vars)
      .then((results) => results.deleteReactNodeTypes),
  [ITypeKind.UnionType]: (vars) =>
    _deleteApi
      .DeleteUnionTypes(vars)
      .then((results) => results.deleteUnionTypes),
  [ITypeKind.CodeMirrorType]: (vars) =>
    _deleteApi
      .DeleteCodeMirrorTypes(vars)
      .then((results) => results.deleteCodeMirrorTypes),
  [ITypeKind.PageType]: (vars) =>
    _deleteApi.DeletePageTypes(vars).then((results) => results.deletePageTypes),
}
