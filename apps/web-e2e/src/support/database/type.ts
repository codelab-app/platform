import { TypeBaseCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
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
} from './graphql/type.api.v2.1.graphql.gen'

const createTypeQuery: { [key in TypeKind]: DocumentNode } = {
  [TypeKind.PrimitiveType]: E2eCreatePrimitiveTypesDocument,
  [TypeKind.ArrayType]: E2eCreateArrayTypesDocument,
  [TypeKind.ElementType]: E2eCreateElementTypesDocument,
  [TypeKind.EnumType]: E2eCreateEnumTypesDocument,
  [TypeKind.InterfaceType]: E2eCreateInterfaceTypesDocument,
  [TypeKind.RenderPropsType]: E2eCreateRenderPropsTypesDocument,
  [TypeKind.PageType]: E2eCreatePageTypesDocument,
  [TypeKind.AppType]: E2eCreateAppTypesDocument,
  [TypeKind.UnionType]: E2eCreateUnionTypesDocument,
  [TypeKind.ReactNodeType]: E2eCreateReactNodeTypesDocument,
  [TypeKind.MonacoType]: E2eCreateMonacoTypesDocument,
  [TypeKind.LambdaType]: E2eCreateLambdaTypesDocument,
}

export const createType = (input: TypeBaseCreateInput, typeKind: TypeKind) =>
  cy
    .graphqlRequest({
      query: print(createTypeQuery[typeKind]),
      variables: { input },
    })
    .then((r) => r.body.data?.createType)
