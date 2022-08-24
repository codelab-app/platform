import { TypeBaseCreateInput } from '@codelab/shared/abstract/codegen'
import { ITypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { DocumentNode, print } from 'graphql'
import {
  CreateActionTypesDocument,
  CreateAppTypesDocument,
  CreateArrayTypesDocument,
  CreateCodeMirrorTypesDocument,
  CreateElementTypesDocument,
  CreateEnumTypesDocument,
  CreateInterfaceTypesDocument,
  CreateLambdaTypesDocument,
  CreatePageTypesDocument,
  CreatePrimitiveTypesDocument,
  CreateReactNodeTypesDocument,
  CreateRenderPropsTypesDocument,
  CreateUnionTypesDocument,
} from '../../../../../libs/frontend/modules/type/src/graphql/create-type.endpoints.graphql.gen'

const createTypeQuery: { [key in ITypeKind]: DocumentNode } = {
  [ITypeKind.PrimitiveType]: CreatePrimitiveTypesDocument,
  [ITypeKind.ArrayType]: CreateArrayTypesDocument,
  [ITypeKind.ElementType]: CreateElementTypesDocument,
  [ITypeKind.EnumType]: CreateEnumTypesDocument,
  [ITypeKind.InterfaceType]: CreateInterfaceTypesDocument,
  [ITypeKind.RenderPropsType]: CreateRenderPropsTypesDocument,
  [ITypeKind.PageType]: CreatePageTypesDocument,
  [ITypeKind.AppType]: CreateAppTypesDocument,
  [ITypeKind.UnionType]: CreateUnionTypesDocument,
  [ITypeKind.ReactNodeType]: CreateReactNodeTypesDocument,
  [ITypeKind.CodeMirrorType]: CreateCodeMirrorTypesDocument,
  [ITypeKind.LambdaType]: CreateLambdaTypesDocument,
  [ITypeKind.ActionType]: CreateActionTypesDocument,
}

export const createType = (input: TypeBaseCreateInput, typeKind: ITypeKind) =>
  cy
    .graphqlRequest({
      query: print(createTypeQuery[typeKind]),
      variables: { input: input[typeKind] },
    })
    .then((result) => result.body.data?.createType as ITypeDTO)
