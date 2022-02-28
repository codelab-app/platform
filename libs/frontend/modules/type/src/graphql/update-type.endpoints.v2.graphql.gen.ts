import * as Types from '@codelab/shared/abstract/codegen-v2';

import { PrimitiveTypeFragment } from './fragments/PrimitiveType.fragment.v2.graphql.gen';
import { ArrayTypeFragment } from './fragments/ArrayType.fragment.v2.graphql.gen';
import { UnionTypeFragment, UnionTypeWithInnerTypesFragment } from './fragments/UnionType.fragment.v2.graphql.gen';
import { InterfaceTypeFragment, InterfaceTypeWithFieldsFragment } from './fragments/Interface.fragment.v2.graphql.gen';
import { ElementTypeFragment } from './fragments/ElementType.fragment.v2.graphql.gen';
import { RenderPropsTypeFragment } from './fragments/RenderProps.fragment.v2.graphql.gen';
import { EnumTypeFragment } from './fragments/EnumType.fragment.v2.graphql.gen';
import { LambdaTypeFragment } from './fragments/LambdaType.fragment.v2.graphql.gen';
import { PageTypeFragment } from './fragments/PageType.fragment.v2.graphql.gen';
import { AppTypeFragment } from './fragments/AppType.fragment.v2.graphql.gen';
import { MonacoTypeFragment } from './fragments/MonacoType.fragment.v2.graphql.gen';
import { gql } from 'graphql-request';
import { PrimitiveTypeFragmentDoc } from './fragments/PrimitiveType.fragment.v2.graphql.gen';
import { ArrayTypeFragmentDoc } from './fragments/ArrayType.fragment.v2.graphql.gen';
import { UnionTypeFragmentDoc, UnionTypeWithInnerTypesFragmentDoc } from './fragments/UnionType.fragment.v2.graphql.gen';
import { InterfaceTypeFragmentDoc, InterfaceTypeWithFieldsFragmentDoc } from './fragments/Interface.fragment.v2.graphql.gen';
import { ElementTypeFragmentDoc } from './fragments/ElementType.fragment.v2.graphql.gen';
import { RenderPropsTypeFragmentDoc } from './fragments/RenderProps.fragment.v2.graphql.gen';
import { EnumTypeFragmentDoc } from './fragments/EnumType.fragment.v2.graphql.gen';
import { LambdaTypeFragmentDoc } from './fragments/LambdaType.fragment.v2.graphql.gen';
import { PageTypeFragmentDoc } from './fragments/PageType.fragment.v2.graphql.gen';
import { AppTypeFragmentDoc } from './fragments/AppType.fragment.v2.graphql.gen';
import { MonacoTypeFragmentDoc } from './fragments/MonacoType.fragment.v2.graphql.gen';
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/redux';
export type UpdatePrimitiveTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.PrimitiveTypeConnectInput>;
  create?: Types.InputMaybe<Types.PrimitiveTypeRelationInput>;
  delete?: Types.InputMaybe<Types.PrimitiveTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.PrimitiveTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.PrimitiveTypeUpdateInput>;
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>;
}>;


export type UpdatePrimitiveTypesMutation = { updatePrimitiveTypes: { primitiveTypes: Array<PrimitiveTypeFragment> } };

export type UpdateArrayTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ArrayTypeConnectInput>;
  create?: Types.InputMaybe<Types.ArrayTypeRelationInput>;
  delete?: Types.InputMaybe<Types.ArrayTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.ArrayTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.ArrayTypeUpdateInput>;
  where?: Types.InputMaybe<Types.ArrayTypeWhere>;
}>;


export type UpdateArrayTypesMutation = { updateArrayTypes: { arrayTypes: Array<ArrayTypeFragment> } };

export type UpdateUnionTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.UnionTypeConnectInput>;
  create?: Types.InputMaybe<Types.UnionTypeRelationInput>;
  delete?: Types.InputMaybe<Types.UnionTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.UnionTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.UnionTypeUpdateInput>;
  where?: Types.InputMaybe<Types.UnionTypeWhere>;
}>;


export type UpdateUnionTypesMutation = { updateUnionTypes: { unionTypes: Array<UnionTypeFragment> } };

export type UpdateInterfaceTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.InterfaceTypeConnectInput>;
  create?: Types.InputMaybe<Types.InterfaceTypeRelationInput>;
  delete?: Types.InputMaybe<Types.InterfaceTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.InterfaceTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.InterfaceTypeUpdateInput>;
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>;
}>;


export type UpdateInterfaceTypesMutation = { updateInterfaceTypes: { interfaceTypes: Array<InterfaceTypeFragment> } };

export type UpdateElementTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.ElementTypeConnectInput>;
  create?: Types.InputMaybe<Types.ElementTypeRelationInput>;
  delete?: Types.InputMaybe<Types.ElementTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.ElementTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.ElementTypeUpdateInput>;
  where?: Types.InputMaybe<Types.ElementTypeWhere>;
}>;


export type UpdateElementTypesMutation = { updateElementTypes: { elementTypes: Array<ElementTypeFragment> } };

export type UpdateRenderPropsTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.RenderPropsTypeConnectInput>;
  create?: Types.InputMaybe<Types.RenderPropsTypeRelationInput>;
  delete?: Types.InputMaybe<Types.RenderPropsTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.RenderPropsTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.RenderPropsTypeUpdateInput>;
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>;
}>;


export type UpdateRenderPropsTypesMutation = { updateRenderPropsTypes: { renderPropsTypes: Array<RenderPropsTypeFragment> } };

export type UpdateEnumTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.EnumTypeConnectInput>;
  create?: Types.InputMaybe<Types.EnumTypeRelationInput>;
  delete?: Types.InputMaybe<Types.EnumTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.EnumTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.EnumTypeUpdateInput>;
  where?: Types.InputMaybe<Types.EnumTypeWhere>;
}>;


export type UpdateEnumTypesMutation = { updateEnumTypes: { enumTypes: Array<EnumTypeFragment> } };

export type UpdateLambdaTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.LambdaTypeConnectInput>;
  create?: Types.InputMaybe<Types.LambdaTypeRelationInput>;
  delete?: Types.InputMaybe<Types.LambdaTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.LambdaTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.LambdaTypeUpdateInput>;
  where?: Types.InputMaybe<Types.LambdaTypeWhere>;
}>;


export type UpdateLambdaTypesMutation = { updateLambdaTypes: { lambdaTypes: Array<LambdaTypeFragment> } };

export type UpdatePageTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.PageTypeConnectInput>;
  create?: Types.InputMaybe<Types.PageTypeRelationInput>;
  delete?: Types.InputMaybe<Types.PageTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.PageTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.PageTypeUpdateInput>;
  where?: Types.InputMaybe<Types.PageTypeWhere>;
}>;


export type UpdatePageTypesMutation = { updatePageTypes: { pageTypes: Array<PageTypeFragment> } };

export type UpdateAppTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.AppTypeConnectInput>;
  create?: Types.InputMaybe<Types.AppTypeRelationInput>;
  delete?: Types.InputMaybe<Types.AppTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.AppTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.AppTypeUpdateInput>;
  where?: Types.InputMaybe<Types.AppTypeWhere>;
}>;


export type UpdateAppTypesMutation = { updateAppTypes: { appTypes: Array<AppTypeFragment> } };

export type UpdateMonacoTypesMutationVariables = Types.Exact<{
  connect?: Types.InputMaybe<Types.MonacoTypeConnectInput>;
  create?: Types.InputMaybe<Types.MonacoTypeRelationInput>;
  delete?: Types.InputMaybe<Types.MonacoTypeDeleteInput>;
  disconnect?: Types.InputMaybe<Types.MonacoTypeDisconnectInput>;
  update?: Types.InputMaybe<Types.MonacoTypeUpdateInput>;
  where?: Types.InputMaybe<Types.MonacoTypeWhere>;
}>;


export type UpdateMonacoTypesMutation = { updateMonacoTypes: { monacoTypes: Array<MonacoTypeFragment> } };


export const UpdatePrimitiveTypesGql = gql`
    mutation UpdatePrimitiveTypes($connect: PrimitiveTypeConnectInput, $create: PrimitiveTypeRelationInput, $delete: PrimitiveTypeDeleteInput, $disconnect: PrimitiveTypeDisconnectInput, $update: PrimitiveTypeUpdateInput, $where: PrimitiveTypeWhere) {
  updatePrimitiveTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    primitiveTypes {
      ...PrimitiveType
    }
  }
}
    ${PrimitiveTypeFragmentDoc}`;
export const UpdateArrayTypesGql = gql`
    mutation UpdateArrayTypes($connect: ArrayTypeConnectInput, $create: ArrayTypeRelationInput, $delete: ArrayTypeDeleteInput, $disconnect: ArrayTypeDisconnectInput, $update: ArrayTypeUpdateInput, $where: ArrayTypeWhere) {
  updateArrayTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    arrayTypes {
      ...ArrayType
    }
  }
}
    ${ArrayTypeFragmentDoc}`;
export const UpdateUnionTypesGql = gql`
    mutation UpdateUnionTypes($connect: UnionTypeConnectInput, $create: UnionTypeRelationInput, $delete: UnionTypeDeleteInput, $disconnect: UnionTypeDisconnectInput, $update: UnionTypeUpdateInput, $where: UnionTypeWhere) {
  updateUnionTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    unionTypes {
      ...UnionType
    }
  }
}
    ${UnionTypeFragmentDoc}`;
export const UpdateInterfaceTypesGql = gql`
    mutation UpdateInterfaceTypes($connect: InterfaceTypeConnectInput, $create: InterfaceTypeRelationInput, $delete: InterfaceTypeDeleteInput, $disconnect: InterfaceTypeDisconnectInput, $update: InterfaceTypeUpdateInput, $where: InterfaceTypeWhere) {
  updateInterfaceTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    interfaceTypes {
      ...InterfaceType
    }
  }
}
    ${InterfaceTypeFragmentDoc}`;
export const UpdateElementTypesGql = gql`
    mutation UpdateElementTypes($connect: ElementTypeConnectInput, $create: ElementTypeRelationInput, $delete: ElementTypeDeleteInput, $disconnect: ElementTypeDisconnectInput, $update: ElementTypeUpdateInput, $where: ElementTypeWhere) {
  updateElementTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    elementTypes {
      ...ElementType
    }
  }
}
    ${ElementTypeFragmentDoc}`;
export const UpdateRenderPropsTypesGql = gql`
    mutation UpdateRenderPropsTypes($connect: RenderPropsTypeConnectInput, $create: RenderPropsTypeRelationInput, $delete: RenderPropsTypeDeleteInput, $disconnect: RenderPropsTypeDisconnectInput, $update: RenderPropsTypeUpdateInput, $where: RenderPropsTypeWhere) {
  updateRenderPropsTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    renderPropsTypes {
      ...RenderPropsType
    }
  }
}
    ${RenderPropsTypeFragmentDoc}`;
export const UpdateEnumTypesGql = gql`
    mutation UpdateEnumTypes($connect: EnumTypeConnectInput, $create: EnumTypeRelationInput, $delete: EnumTypeDeleteInput, $disconnect: EnumTypeDisconnectInput, $update: EnumTypeUpdateInput, $where: EnumTypeWhere) {
  updateEnumTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    enumTypes {
      ...EnumType
    }
  }
}
    ${EnumTypeFragmentDoc}`;
export const UpdateLambdaTypesGql = gql`
    mutation UpdateLambdaTypes($connect: LambdaTypeConnectInput, $create: LambdaTypeRelationInput, $delete: LambdaTypeDeleteInput, $disconnect: LambdaTypeDisconnectInput, $update: LambdaTypeUpdateInput, $where: LambdaTypeWhere) {
  updateLambdaTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    lambdaTypes {
      ...LambdaType
    }
  }
}
    ${LambdaTypeFragmentDoc}`;
export const UpdatePageTypesGql = gql`
    mutation UpdatePageTypes($connect: PageTypeConnectInput, $create: PageTypeRelationInput, $delete: PageTypeDeleteInput, $disconnect: PageTypeDisconnectInput, $update: PageTypeUpdateInput, $where: PageTypeWhere) {
  updatePageTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    pageTypes {
      ...PageType
    }
  }
}
    ${PageTypeFragmentDoc}`;
export const UpdateAppTypesGql = gql`
    mutation UpdateAppTypes($connect: AppTypeConnectInput, $create: AppTypeRelationInput, $delete: AppTypeDeleteInput, $disconnect: AppTypeDisconnectInput, $update: AppTypeUpdateInput, $where: AppTypeWhere) {
  updateAppTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    appTypes {
      ...AppType
    }
  }
}
    ${AppTypeFragmentDoc}`;
export const UpdateMonacoTypesGql = gql`
    mutation UpdateMonacoTypes($connect: MonacoTypeConnectInput, $create: MonacoTypeRelationInput, $delete: MonacoTypeDeleteInput, $disconnect: MonacoTypeDisconnectInput, $update: MonacoTypeUpdateInput, $where: MonacoTypeWhere) {
  updateMonacoTypes(
    connect: $connect
    create: $create
    delete: $delete
    disconnect: $disconnect
    update: $update
    where: $where
  ) {
    monacoTypes {
      ...MonacoType
    }
  }
}
    ${MonacoTypeFragmentDoc}`;

  const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
      UpdatePrimitiveTypes: build.mutation<UpdatePrimitiveTypesMutation, GraphqlOperationOptions<UpdatePrimitiveTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdatePrimitiveTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateArrayTypes: build.mutation<UpdateArrayTypesMutation, GraphqlOperationOptions<UpdateArrayTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateArrayTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateUnionTypes: build.mutation<UpdateUnionTypesMutation, GraphqlOperationOptions<UpdateUnionTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateUnionTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateInterfaceTypes: build.mutation<UpdateInterfaceTypesMutation, GraphqlOperationOptions<UpdateInterfaceTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateInterfaceTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateElementTypes: build.mutation<UpdateElementTypesMutation, GraphqlOperationOptions<UpdateElementTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateElementTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateRenderPropsTypes: build.mutation<UpdateRenderPropsTypesMutation, GraphqlOperationOptions<UpdateRenderPropsTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateRenderPropsTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateEnumTypes: build.mutation<UpdateEnumTypesMutation, GraphqlOperationOptions<UpdateEnumTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateEnumTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateLambdaTypes: build.mutation<UpdateLambdaTypesMutation, GraphqlOperationOptions<UpdateLambdaTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateLambdaTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdatePageTypes: build.mutation<UpdatePageTypesMutation, GraphqlOperationOptions<UpdatePageTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdatePageTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateAppTypes: build.mutation<UpdateAppTypesMutation, GraphqlOperationOptions<UpdateAppTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateAppTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
      UpdateMonacoTypes: build.mutation<UpdateMonacoTypesMutation, GraphqlOperationOptions<UpdateMonacoTypesMutationVariables> | void | undefined>({
        query: (options) => ({ document: UpdateMonacoTypesGql, options: {...{"context":{"env":"v2"}}, ...options}, })
      }),
    }),
  });
  export { injectedRtkApi as api };
  export const { useUpdatePrimitiveTypesMutation, useUpdateArrayTypesMutation, useUpdateUnionTypesMutation, useUpdateInterfaceTypesMutation, useUpdateElementTypesMutation, useUpdateRenderPropsTypesMutation, useUpdateEnumTypesMutation, useUpdateLambdaTypesMutation, useUpdatePageTypesMutation, useUpdateAppTypesMutation, useUpdateMonacoTypesMutation } = injectedRtkApi;

