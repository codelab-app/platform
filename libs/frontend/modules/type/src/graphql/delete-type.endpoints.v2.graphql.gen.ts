import * as Types from '@codelab/shared/abstract/codegen-v2';

import { gql } from 'graphql-request';
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/redux';
export type DeletePrimitiveTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.PrimitiveTypeDeleteInput>;
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>;
}>;


export type DeletePrimitiveTypesMutation = { deletePrimitiveTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteArrayTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.ArrayTypeDeleteInput>;
  where?: Types.InputMaybe<Types.ArrayTypeWhere>;
}>;


export type DeleteArrayTypesMutation = { deleteArrayTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteUnionTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.UnionTypeDeleteInput>;
  where?: Types.InputMaybe<Types.UnionTypeWhere>;
}>;


export type DeleteUnionTypesMutation = { deleteUnionTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteInterfaceTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.InterfaceTypeDeleteInput>;
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>;
}>;


export type DeleteInterfaceTypesMutation = { deleteInterfaceTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteElementTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.ElementTypeDeleteInput>;
  where?: Types.InputMaybe<Types.ElementTypeWhere>;
}>;


export type DeleteElementTypesMutation = { deleteElementTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteRenderPropsTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.RenderPropsTypeDeleteInput>;
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>;
}>;


export type DeleteRenderPropsTypesMutation = { deleteRenderPropsTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteEnumTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.EnumTypeDeleteInput>;
  where?: Types.InputMaybe<Types.EnumTypeWhere>;
}>;


export type DeleteEnumTypesMutation = { deleteEnumTypes: { relationshipsDeleted: number, nodesDeleted: number }, deleteEnumTypeValues: { nodesDeleted: number } };

export type DeleteLambdaTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.LambdaTypeDeleteInput>;
  where?: Types.InputMaybe<Types.LambdaTypeWhere>;
}>;


export type DeleteLambdaTypesMutation = { deleteLambdaTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeletePageTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.PageTypeDeleteInput>;
  where?: Types.InputMaybe<Types.PageTypeWhere>;
}>;


export type DeletePageTypesMutation = { deletePageTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteAppTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.AppTypeDeleteInput>;
  where?: Types.InputMaybe<Types.AppTypeWhere>;
}>;


export type DeleteAppTypesMutation = { deleteAppTypes: { relationshipsDeleted: number, nodesDeleted: number } };

export type DeleteMonacoTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.MonacoTypeDeleteInput>;
  where?: Types.InputMaybe<Types.MonacoTypeWhere>;
}>;


export type DeleteMonacoTypesMutation = { deleteMonacoTypes: { relationshipsDeleted: number, nodesDeleted: number } };


export const DeletePrimitiveTypesGql = gql`
    mutation DeletePrimitiveTypes($delete: PrimitiveTypeDeleteInput, $where: PrimitiveTypeWhere) {
  deletePrimitiveTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteArrayTypesGql = gql`
    mutation DeleteArrayTypes($delete: ArrayTypeDeleteInput, $where: ArrayTypeWhere) {
  deleteArrayTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteUnionTypesGql = gql`
    mutation DeleteUnionTypes($delete: UnionTypeDeleteInput, $where: UnionTypeWhere) {
  deleteUnionTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteInterfaceTypesGql = gql`
    mutation DeleteInterfaceTypes($delete: InterfaceTypeDeleteInput, $where: InterfaceTypeWhere) {
  deleteInterfaceTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteElementTypesGql = gql`
    mutation DeleteElementTypes($delete: ElementTypeDeleteInput, $where: ElementTypeWhere) {
  deleteElementTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteRenderPropsTypesGql = gql`
    mutation DeleteRenderPropsTypes($delete: RenderPropsTypeDeleteInput, $where: RenderPropsTypeWhere) {
  deleteRenderPropsTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteEnumTypesGql = gql`
    mutation DeleteEnumTypes($delete: EnumTypeDeleteInput, $where: EnumTypeWhere) {
  deleteEnumTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
  deleteEnumTypeValues(where: {enumType: $where}) {
    nodesDeleted
  }
}
    `;
export const DeleteLambdaTypesGql = gql`
    mutation DeleteLambdaTypes($delete: LambdaTypeDeleteInput, $where: LambdaTypeWhere) {
  deleteLambdaTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeletePageTypesGql = gql`
    mutation DeletePageTypes($delete: PageTypeDeleteInput, $where: PageTypeWhere) {
  deletePageTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteAppTypesGql = gql`
    mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
  deleteAppTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;
export const DeleteMonacoTypesGql = gql`
    mutation DeleteMonacoTypes($delete: MonacoTypeDeleteInput, $where: MonacoTypeWhere) {
  deleteMonacoTypes(delete: $delete, where: $where) {
    relationshipsDeleted
    nodesDeleted
  }
}
    `;

  const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
      DeletePrimitiveTypes: build.mutation<DeletePrimitiveTypesMutation, GraphqlOperationOptions<DeletePrimitiveTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeletePrimitiveTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteArrayTypes: build.mutation<DeleteArrayTypesMutation, GraphqlOperationOptions<DeleteArrayTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteArrayTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteUnionTypes: build.mutation<DeleteUnionTypesMutation, GraphqlOperationOptions<DeleteUnionTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteUnionTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteInterfaceTypes: build.mutation<DeleteInterfaceTypesMutation, GraphqlOperationOptions<DeleteInterfaceTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteInterfaceTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteElementTypes: build.mutation<DeleteElementTypesMutation, GraphqlOperationOptions<DeleteElementTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteElementTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteRenderPropsTypes: build.mutation<DeleteRenderPropsTypesMutation, GraphqlOperationOptions<DeleteRenderPropsTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteRenderPropsTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteEnumTypes: build.mutation<DeleteEnumTypesMutation, GraphqlOperationOptions<DeleteEnumTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteEnumTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteLambdaTypes: build.mutation<DeleteLambdaTypesMutation, GraphqlOperationOptions<DeleteLambdaTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteLambdaTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeletePageTypes: build.mutation<DeletePageTypesMutation, GraphqlOperationOptions<DeletePageTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeletePageTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteAppTypes: build.mutation<DeleteAppTypesMutation, GraphqlOperationOptions<DeleteAppTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteAppTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      DeleteMonacoTypes: build.mutation<DeleteMonacoTypesMutation, GraphqlOperationOptions<DeleteMonacoTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: DeleteMonacoTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
    }),
  });
  export { injectedRtkApi as api };
  export const { useDeletePrimitiveTypesMutation, useDeleteArrayTypesMutation, useDeleteUnionTypesMutation, useDeleteInterfaceTypesMutation, useDeleteElementTypesMutation, useDeleteRenderPropsTypesMutation, useDeleteEnumTypesMutation, useDeleteLambdaTypesMutation, useDeletePageTypesMutation, useDeleteAppTypesMutation, useDeleteMonacoTypesMutation } = injectedRtkApi;

