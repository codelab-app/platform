import type { Ref } from 'mobx-keystone'

import { Typebox } from '@codelab/shared-infra-typebox'
import { Type } from '@sinclair/typebox'

import { ITypeKind } from './type-kind.enum'

/**
 * JSON export
 */
export const BaseTypeExportSchema = Type.Object({
  __typename: Type.String(),
  id: Type.String(),
  kind: Type.Enum(ITypeKind),
  name: Type.String(),
})

export interface IBaseTypeDto<T extends `${ITypeKind}` = `${ITypeKind}`> {
  __typename: T
  id: string
  kind: ITypeKind
  name: string
  owner: { id: string }
}

/**
 * For GraphQL create, the api takes in an enum
 */
export const BaseTypeDtoSchema = <T extends `${ITypeKind}`>(kind: T) =>
  Type.Object({
    /**
     * Needs to be optional since our Neo4j OGM returns only optional
     */
    __typename: Type.Literal<T>(kind),
    id: Type.String(),
    kind: Type.Enum(ITypeKind),
    name: Type.String(),
    owner: Typebox.RefSchema,
  })
