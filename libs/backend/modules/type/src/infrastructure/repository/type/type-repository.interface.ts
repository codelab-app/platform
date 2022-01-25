import { IBaseRepository, ITransaction } from '@codelab/backend/infra'
import {
  IField,
  IType,
  ITypeGraph,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { EntityLike, Maybe } from '@codelab/shared/abstract/types'

export interface ITypesWhere {
  ids?: Array<string>
  kind?: TypeKind
  primitiveKind?: PrimitiveTypeKind
  name?: string
}

export interface ITypeGraphWhereUnique {
  id?: string
  name?: string
  atomId?: string
}

export interface ITypeWhereUnique extends ITypeGraphWhereUnique {
  enumTypeValueId?: string
}

export interface ITypeRepository extends IBaseRepository<IType> {
  getOneWhere(
    where: ITypeWhereUnique,
    transaction: ITransaction,
  ): Promise<Maybe<IType>>

  getGraphWhere(
    where: ITypeGraphWhereUnique,
    transaction: ITransaction,
  ): Promise<Maybe<ITypeGraph>>

  /** Return all types owned by the user + types with no owner */
  getUserTypes(
    userId: string,
    where: Maybe<ITypesWhere>,
    transaction: ITransaction,
  ): Promise<Array<IType>>

  /** Return all types with no owner */
  getAdminTypes(
    where: Maybe<ITypesWhere>,
    transaction: ITransaction,
  ): Promise<Array<IType>>

  getTypesByExactNames(
    names: Array<string>,
    transaction: ITransaction,
  ): Promise<Array<IType>>

  getTypeReferences(
    typeId: string,
    transaction: ITransaction,
  ): Promise<TypeReferencesResponse>

  getField(fieldId: string, transaction: ITransaction): Promise<Maybe<IField>>
}

export interface TypeReferencesResponse {
  fields?: Array<EntityLike & { name?: string }>
  atoms?: Array<EntityLike & { name?: string }>
}

export const ITypeRepositoryToken = Symbol('TypeRepository')
