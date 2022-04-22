import { TypeBaseCreateInput } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { DocumentNode, print } from 'graphql'
import {
  E2eCreateAppTypesDocument,
  E2eCreateArrayTypesDocument,
  E2eCreateElementTypesDocument,
  E2eCreateEnumTypesDocument,
  E2eCreateInterfaceTypesDocument,
  E2eCreateLambdaTypesDocument,
  E2eCreateMonacoTypesDocument,
  E2eCreatePageTypesDocument,
  E2eCreatePrimitiveTypesDocument,
  E2eCreateReactNodeTypesDocument,
  E2eCreateRenderPropsTypesDocument,
  E2eCreateUnionTypesDocument,
} from './graphql/type.endpoints.graphql.gen'

const createTypeQuery: { [key in ITypeKind]: DocumentNode } = {
  [ITypeKind.PrimitiveType]: E2eCreatePrimitiveTypesDocument,
  [ITypeKind.ArrayType]: E2eCreateArrayTypesDocument,
  [ITypeKind.ElementType]: E2eCreateElementTypesDocument,
  [ITypeKind.EnumType]: E2eCreateEnumTypesDocument,
  [ITypeKind.InterfaceType]: E2eCreateInterfaceTypesDocument,
  [ITypeKind.RenderPropsType]: E2eCreateRenderPropsTypesDocument,
  [ITypeKind.PageType]: E2eCreatePageTypesDocument,
  [ITypeKind.AppType]: E2eCreateAppTypesDocument,
  [ITypeKind.UnionType]: E2eCreateUnionTypesDocument,
  [ITypeKind.ReactNodeType]: E2eCreateReactNodeTypesDocument,
  [ITypeKind.MonacoType]: E2eCreateMonacoTypesDocument,
  [ITypeKind.LambdaType]: E2eCreateLambdaTypesDocument,
}

export const createType = (input: TypeBaseCreateInput, typeKind: ITypeKind) =>
  cy
    .graphqlRequest({
      query: print(createTypeQuery[typeKind]),
      variables: { input },
    })
    .then((r) => r.body.data?.createType)
