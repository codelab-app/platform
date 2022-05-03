import { client } from '@codelab/frontend/model/infra/graphql'
import {
  IConnectTypeInput,
  ICreateTypeInput,
  IDeleteTypeInput,
  IDisconnectTypeInput,
  ITypeDTO,
  ITypeKind,
  ITypeWhere,
  IUpdateTypeInput,
} from '@codelab/shared/abstract/core'
import { UnboxArray } from '@codelab/shared/abstract/types'
import { flatten } from 'lodash'
import { getSdk as getCreateSdk } from '../../graphql/create-type.endpoints.graphql.gen'
import { getSdk as getDeleteSdk } from '../../graphql/delete-type.endpoints.graphql.gen'
import {
  getSdk as getGetSdk,
  GetTypesQuery,
} from '../../graphql/get-type.endpoints.graphql.gen'
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
  (
    input: ICreateTypeInput | Array<ICreateTypeInput>,
  ) => Promise<Array<ITypeDTO>>
>

export const createTypeApi: CreateTypesRecord = {
  [ITypeKind.AppType]: (input) =>
    _createApi.CreateAppTypes({ input }).then((r) => r.types.types),
  [ITypeKind.PrimitiveType]: (input) =>
    _createApi
      .CreatePrimitiveTypes({ input: input as any })
      .then((r) => r.types.types),
  [ITypeKind.ArrayType]: (input) =>
    _createApi.CreateArrayTypes({ input }).then((r) => r.types.types),
  [ITypeKind.InterfaceType]: (input) =>
    _createApi
      .CreateInterfaceTypes({ input: input as any })
      .then((r) => r.types.types),
  [ITypeKind.EnumType]: (input) =>
    _createApi.CreateEnumTypes({ input }).then((r) => r.types.types),
  [ITypeKind.LambdaType]: (input) =>
    _createApi.CreateLambdaTypes({ input }).then((r) => r.types.types),
  [ITypeKind.ElementType]: (input) =>
    _createApi
      .CreateElementTypes({ input: input as any })
      .then((r) => r.types.types),
  [ITypeKind.RenderPropsType]: (input) =>
    _createApi.CreateRenderPropsTypes({ input }).then((r) => r.types.types),
  [ITypeKind.ReactNodeType]: (input) =>
    _createApi
      .CreateReactNodeTypes({ input: input as any })
      .then((r) => r.types.types),
  [ITypeKind.UnionType]: (input) =>
    _createApi.CreateUnionTypes({ input }).then((r) => r.types.types),
  [ITypeKind.MonacoType]: (input) =>
    _createApi
      .CreateMonacoTypes({ input: input as any })
      .then((r) => r.types.types),
  [ITypeKind.PageType]: (input) =>
    _createApi.CreatePageTypes({ input }).then((r) => r.types.types),
  [ITypeKind.AppType]: (input) =>
    _createApi.CreateAppTypes({ input }).then((r) => r.types.types),
}

export const getTypeApi = getGetSdk(client)

export const getAllTypes = async (
  ids?: Array<string>,
): Promise<Array<UnboxArray<GetTypesQuery[keyof GetTypesQuery]>>> => {
  const allResults = await getTypeApi.GetTypes({ ids })

  return flatten(Object.values(allResults) as any)
}

//
// Update
//
const _updateApi = getUpdateSdk(client)

type UpdateTypesRecord = Record<
  ITypeKind,
  (vars: {
    where: ITypeWhere
    update: IUpdateTypeInput
    delete?: IDeleteTypeInput
    disconnect?: IDisconnectTypeInput
    connect?: IConnectTypeInput
  }) => Promise<Array<ITypeDTO>>
>

export const updateTypeApi: UpdateTypesRecord = {
  [ITypeKind.AppType]: (vars) =>
    _updateApi.UpdateAppTypes(vars).then((r) => r.types.types),
  [ITypeKind.PrimitiveType]: (vars) =>
    _updateApi.UpdatePrimitiveTypes(vars).then((r) => r.types.types),
  [ITypeKind.ArrayType]: (vars) =>
    _updateApi.UpdateArrayTypes(vars).then((r) => r.types.types),
  [ITypeKind.InterfaceType]: (vars) =>
    _updateApi.UpdateInterfaceTypes(vars).then((r) => r.types.types),
  [ITypeKind.EnumType]: (vars) =>
    _updateApi.UpdateEnumTypes(vars).then((r) => r.types.types),
  [ITypeKind.LambdaType]: (vars) =>
    _updateApi.UpdateLambdaTypes(vars).then((r) => r.types.types),
  [ITypeKind.ElementType]: (vars) =>
    _updateApi.UpdateElementTypes(vars).then((r) => r.types.types),
  [ITypeKind.RenderPropsType]: (vars) =>
    _updateApi.UpdateRenderPropsTypes(vars).then((r) => r.types.types),
  [ITypeKind.ReactNodeType]: (vars) =>
    _updateApi.UpdateReactNodeTypes(vars).then((r) => r.types.types),
  [ITypeKind.UnionType]: (vars) =>
    _updateApi.UpdateUnionTypes(vars).then((r) => r.types.types),
  [ITypeKind.MonacoType]: (vars) =>
    _updateApi.UpdateMonacoTypes(vars).then((r) => r.types.types),
  [ITypeKind.PageType]: (vars) =>
    _updateApi.UpdatePageTypes(vars).then((r) => r.types.types),
  [ITypeKind.AppType]: (vars) =>
    _updateApi.UpdateAppTypes(vars).then((r) => r.types.types),
}

//
// Delete
//
const _deleteApi = getDeleteSdk(client)

type DeleteTypesRecord = Record<
  ITypeKind,
  (vars: {
    where: ITypeWhere
  }) => Promise<{ relationshipsDeleted: number; nodesDeleted: number }>
>

export const deleteTypeApi: DeleteTypesRecord = {
  [ITypeKind.AppType]: (vars) =>
    _deleteApi.DeleteAppTypes(vars).then((r) => r.deleteAppTypes),
  [ITypeKind.PrimitiveType]: (vars) =>
    _deleteApi.DeletePrimitiveTypes(vars).then((r) => r.deletePrimitiveTypes),
  [ITypeKind.ArrayType]: (vars) =>
    _deleteApi.DeleteArrayTypes(vars).then((r) => r.deleteArrayTypes),
  [ITypeKind.InterfaceType]: (vars) =>
    _deleteApi.DeleteInterfaceTypes(vars).then((r) => r.deleteInterfaceTypes),
  [ITypeKind.EnumType]: (vars) =>
    _deleteApi.DeleteEnumTypes(vars).then((r) => r.deleteEnumTypes),
  [ITypeKind.LambdaType]: (vars) =>
    _deleteApi.DeleteLambdaTypes(vars).then((r) => r.deleteLambdaTypes),
  [ITypeKind.ElementType]: (vars) =>
    _deleteApi.DeleteElementTypes(vars).then((r) => r.deleteElementTypes),
  [ITypeKind.RenderPropsType]: (vars) =>
    _deleteApi
      .DeleteRenderPropsTypes(vars)
      .then((r) => r.deleteRenderPropsTypes),
  [ITypeKind.ReactNodeType]: (vars) =>
    _deleteApi.DeleteReactNodeTypes(vars).then((r) => r.deleteReactNodeTypes),
  [ITypeKind.UnionType]: (vars) =>
    _deleteApi.DeleteUnionTypes(vars).then((r) => r.deleteUnionTypes),
  [ITypeKind.MonacoType]: (vars) =>
    _deleteApi.DeleteMonacoTypes(vars).then((r) => r.deleteMonacoTypes),
  [ITypeKind.PageType]: (vars) =>
    _deleteApi.DeletePageTypes(vars).then((r) => r.deletePageTypes),
  [ITypeKind.AppType]: (vars) =>
    _deleteApi.DeleteAppTypes(vars).then((r) => r.deleteAppTypes),
}
