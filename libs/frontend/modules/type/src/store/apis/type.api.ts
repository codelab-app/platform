import { client } from '@codelab/frontend/model/infra/graphql'
import * as cg from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import { UnboxArray } from '@codelab/shared/abstract/types'
import { flatten } from 'lodash'
import { getSdk as getCreateSdk } from '../../graphql/create-type.endpoints.v2.1.graphql.gen'
import { getSdk as getDeleteSdk } from '../../graphql/delete-type.endpoints.v2.1.graphql.gen'
import { TypeFragment } from '../../graphql/fragments/Type.fragment.v2.1.graphql.gen'
import {
  getSdk as getGetSdk,
  GetTypesQuery,
} from '../../graphql/get-type.endpoints.v2.1.graphql.gen'
import { getSdk } from '../../graphql/type.endpoints.v2.1.graphql.gen'
import { getSdk as getUpdateSdk } from '../../graphql/update-type.endpoints.v2.1.graphql.gen'

// Neo4j provides us with a way to query/mutate each individual type but not all of them at once.
// so here are a collection of helper functions that allow us to universally query/mutate a type, based on its type kind

export const typeApi = getSdk(client)

//
// Create
//
const _createApi = getCreateSdk(client)

type CreateTypesRecord = Record<
  TypeKind,
  (input: CreateTypeInput) => Promise<Array<TypeFragment>>
>

export const createTypeApi: CreateTypesRecord = {
  [TypeKind.AppType]: (input) =>
    _createApi.CreateAppTypes({ input }).then((r) => r.types.types),
  [TypeKind.PrimitiveType]: (input) =>
    _createApi
      .CreatePrimitiveTypes({ input: input as any })
      .then((r) => r.types.types),
  [TypeKind.ArrayType]: (input) =>
    _createApi.CreateArrayTypes({ input }).then((r) => r.types.types),
  [TypeKind.InterfaceType]: (input) =>
    _createApi
      .CreateInterfaceTypes({ input: input as any })
      .then((r) => r.types.types),
  [TypeKind.EnumType]: (input) =>
    _createApi.CreateEnumTypes({ input }).then((r) => r.types.types),
  [TypeKind.LambdaType]: (input) =>
    _createApi.CreateLambdaTypes({ input }).then((r) => r.types.types),
  [TypeKind.ElementType]: (input) =>
    _createApi
      .CreateElementTypes({ input: input as any })
      .then((r) => r.types.types),
  [TypeKind.RenderPropsType]: (input) =>
    _createApi.CreateRenderPropsTypes({ input }).then((r) => r.types.types),
  [TypeKind.ReactNodeType]: (input) =>
    _createApi
      .CreateReactNodeTypes({ input: input as any })
      .then((r) => r.types.types),
  [TypeKind.UnionType]: (input) =>
    _createApi.CreateUnionTypes({ input }).then((r) => r.types.types),
  [TypeKind.MonacoType]: (input) =>
    _createApi
      .CreateMonacoTypes({ input: input as any })
      .then((r) => r.types.types),
  [TypeKind.PageType]: (input) =>
    _createApi.CreatePageTypes({ input }).then((r) => r.types.types),
  [TypeKind.AppType]: (input) =>
    _createApi.CreateAppTypes({ input }).then((r) => r.types.types),
}

export type CreateTypeInput =
  | cg.PrimitiveTypeCreateInput
  | cg.ArrayTypeCreateInput
  | cg.InterfaceTypeCreateInput
  | cg.EnumTypeCreateInput
  | cg.LambdaTypeCreateInput
  | cg.ElementTypeCreateInput
  | cg.RenderPropsTypeCreateInput
  | cg.ReactNodeTypeCreateInput
  | cg.UnionTypeCreateInput
  | cg.MonacoTypeCreateInput
  | cg.PageTypeCreateInput
  | cg.AppTypeCreateInput

//
// Get
//
export type AllTypesOptions = cg.AppTypeOptions &
  cg.ArrayTypeOptions &
  cg.ElementTypeOptions &
  cg.EnumTypeOptions &
  cg.InterfaceTypeOptions &
  cg.LambdaTypeOptions &
  cg.MonacoTypeOptions &
  cg.PageTypeOptions &
  cg.PrimitiveTypeOptions &
  cg.ReactNodeTypeOptions &
  cg.RenderPropsTypeOptions &
  cg.UnionTypeOptions

export type AllTypesWhere = cg.AppTypeWhere &
  cg.ArrayTypeWhere &
  cg.ElementTypeWhere &
  cg.EnumTypeWhere &
  cg.InterfaceTypeWhere &
  cg.LambdaTypeWhere &
  cg.MonacoTypeWhere &
  cg.PageTypeWhere &
  cg.PrimitiveTypeWhere &
  cg.ReactNodeTypeWhere &
  cg.RenderPropsTypeWhere &
  cg.UnionTypeWhere

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
  TypeKind,
  (vars: {
    where: AllTypesWhere
    udate: UpdateTypeInput
  }) => Promise<Array<TypeFragment>>
>
export type UpdateTypeInput =
  | cg.AppTypeUpdateInput
  | cg.ArrayTypeUpdateInput
  | cg.ElementTypeUpdateInput
  | cg.EnumTypeUpdateInput
  | cg.InterfaceTypeUpdateInput
  | cg.LambdaTypeUpdateInput
  | cg.MonacoTypeUpdateInput
  | cg.PageTypeUpdateInput
  | cg.PrimitiveTypeUpdateInput
  | cg.ReactNodeTypeUpdateInput
  | cg.RenderPropsTypeUpdateInput
  | cg.UnionTypeUpdateInput

export const updateTypeApi: UpdateTypesRecord = {
  [TypeKind.AppType]: (vars) =>
    _updateApi.UpdateAppTypes(vars).then((r) => r.types.types),
  [TypeKind.PrimitiveType]: (vars) =>
    _updateApi.UpdatePrimitiveTypes(vars).then((r) => r.types.types),
  [TypeKind.ArrayType]: (vars) =>
    _updateApi.UpdateArrayTypes(vars).then((r) => r.types.types),
  [TypeKind.InterfaceType]: (vars) =>
    _updateApi.UpdateInterfaceTypes(vars).then((r) => r.types.types),
  [TypeKind.EnumType]: (vars) =>
    _updateApi.UpdateEnumTypes(vars).then((r) => r.types.types),
  [TypeKind.LambdaType]: (vars) =>
    _updateApi.UpdateLambdaTypes(vars).then((r) => r.types.types),
  [TypeKind.ElementType]: (vars) =>
    _updateApi.UpdateElementTypes(vars).then((r) => r.types.types),
  [TypeKind.RenderPropsType]: (vars) =>
    _updateApi.UpdateRenderPropsTypes(vars).then((r) => r.types.types),
  [TypeKind.ReactNodeType]: (vars) =>
    _updateApi.UpdateReactNodeTypes(vars).then((r) => r.types.types),
  [TypeKind.UnionType]: (vars) =>
    _updateApi.UpdateUnionTypes(vars).then((r) => r.types.types),
  [TypeKind.MonacoType]: (vars) =>
    _updateApi.UpdateMonacoTypes(vars).then((r) => r.types.types),
  [TypeKind.PageType]: (vars) =>
    _updateApi.UpdatePageTypes(vars).then((r) => r.types.types),
  [TypeKind.AppType]: (vars) =>
    _updateApi.UpdateAppTypes(vars).then((r) => r.types.types),
}

//
// Delete
//
const _deleteApi = getDeleteSdk(client)

type DeleteTypesRecord = Record<
  TypeKind,
  (vars: {
    where: AllTypesWhere
  }) => Promise<{ relationshipsDeleted: number; nodesDeleted: number }>
>

export const deleteTypeApi: DeleteTypesRecord = {
  [TypeKind.AppType]: (vars) =>
    _deleteApi.DeleteAppTypes(vars).then((r) => r.deleteAppTypes),
  [TypeKind.PrimitiveType]: (vars) =>
    _deleteApi.DeletePrimitiveTypes(vars).then((r) => r.deletePrimitiveTypes),
  [TypeKind.ArrayType]: (vars) =>
    _deleteApi.DeleteArrayTypes(vars).then((r) => r.deleteArrayTypes),
  [TypeKind.InterfaceType]: (vars) =>
    _deleteApi.DeleteInterfaceTypes(vars).then((r) => r.deleteInterfaceTypes),
  [TypeKind.EnumType]: (vars) =>
    _deleteApi.DeleteEnumTypes(vars).then((r) => r.deleteEnumTypes),
  [TypeKind.LambdaType]: (vars) =>
    _deleteApi.DeleteLambdaTypes(vars).then((r) => r.deleteLambdaTypes),
  [TypeKind.ElementType]: (vars) =>
    _deleteApi.DeleteElementTypes(vars).then((r) => r.deleteElementTypes),
  [TypeKind.RenderPropsType]: (vars) =>
    _deleteApi
      .DeleteRenderPropsTypes(vars)
      .then((r) => r.deleteRenderPropsTypes),
  [TypeKind.ReactNodeType]: (vars) =>
    _deleteApi.DeleteReactNodeTypes(vars).then((r) => r.deleteReactNodeTypes),
  [TypeKind.UnionType]: (vars) =>
    _deleteApi.DeleteUnionTypes(vars).then((r) => r.deleteUnionTypes),
  [TypeKind.MonacoType]: (vars) =>
    _deleteApi.DeleteMonacoTypes(vars).then((r) => r.deleteMonacoTypes),
  [TypeKind.PageType]: (vars) =>
    _deleteApi.DeletePageTypes(vars).then((r) => r.deletePageTypes),
  [TypeKind.AppType]: (vars) =>
    _deleteApi.DeleteAppTypes(vars).then((r) => r.deleteAppTypes),
}
