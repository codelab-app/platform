import * as Types from '@codelab/shared/codegen/graphql';

import { api } from '@codelab/frontend/model/infra/api';
export type UpdateEnumTypeMutationVariables = Types.Exact<{
  input: Types.UpdateEnumTypeInput;
}>;


export type UpdateEnumTypeMutation = { updateEnumType?: void | null | undefined };

export type UpdateTypeMutationVariables = Types.Exact<{
  input: Types.UpdateTypeInput;
}>;


export type UpdateTypeMutation = { updateType?: void | null | undefined };

export type UpdatePrimitiveTypeMutationVariables = Types.Exact<{
  input: Types.UpdatePrimitiveTypeInput;
}>;


export type UpdatePrimitiveTypeMutation = { updatePrimitiveType?: void | null | undefined };

export type UpdateUnionTypeMutationVariables = Types.Exact<{
  input: Types.UpdateUnionTypeInput;
}>;


export type UpdateUnionTypeMutation = { updateUnionType?: void | null | undefined };


export const UpdateEnumTypeGql = `
    mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
  updateEnumType(input: $input)
}
    `;
export const UpdateTypeGql = `
    mutation UpdateType($input: UpdateTypeInput!) {
  updateType(input: $input)
}
    `;
export const UpdatePrimitiveTypeGql = `
    mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
  updatePrimitiveType(input: $input)
}
    `;
export const UpdateUnionTypeGql = `
    mutation UpdateUnionType($input: UpdateUnionTypeInput!) {
  updateUnionType(input: $input)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateEnumType: build.mutation<UpdateEnumTypeMutation, UpdateEnumTypeMutationVariables>({
      query: (variables) => ({ document: UpdateEnumTypeGql, variables })
    }),
    UpdateType: build.mutation<UpdateTypeMutation, UpdateTypeMutationVariables>({
      query: (variables) => ({ document: UpdateTypeGql, variables })
    }),
    UpdatePrimitiveType: build.mutation<UpdatePrimitiveTypeMutation, UpdatePrimitiveTypeMutationVariables>({
      query: (variables) => ({ document: UpdatePrimitiveTypeGql, variables })
    }),
    UpdateUnionType: build.mutation<UpdateUnionTypeMutation, UpdateUnionTypeMutationVariables>({
      query: (variables) => ({ document: UpdateUnionTypeGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateEnumTypeMutation, useUpdateTypeMutation, useUpdatePrimitiveTypeMutation, useUpdateUnionTypeMutation } = injectedRtkApi;

