import {
  DgraphEntityType,
  ITransaction,
  ITypeGraphWhereUnique,
  ITypeRepository,
  ITypesWhere,
  ITypeWhereUnique,
  TypeReferencesResponse,
} from '@codelab/backend/abstract/core'
import {
  BaseRepository,
  combineFilters,
  DgraphRepository,
  makeUidFilter,
} from '@codelab/backend/infra'
import {
  FieldSchema,
  IField,
  IType,
  ITypeGraph,
  TypeSchema,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { TypeMutationFactory } from './type-mutation.factory'
import { TypeQueryFactory } from './type-query.factory'

@Injectable()
export class TypeRepository
  extends BaseRepository<IType, TypeQueryFactory, TypeMutationFactory>
  implements ITypeRepository
{
  constructor(dgraph: DgraphRepository) {
    super(
      dgraph,
      DgraphEntityType.Type,
      new TypeQueryFactory(),
      new TypeMutationFactory(),
      TypeSchema,
    )
  }

  async getOneWhere(
    where: ITypeWhereUnique,
    transaction: ITransaction,
  ): Promise<Maybe<IType>> {
    const queryName = `getOneType`
    const query = this.getQueryByWhereUnique(where, queryName)

    return this.getHelper(query, transaction, queryName)
  }

  async getGraphWhere(
    where: ITypeGraphWhereUnique,
    transaction: ITransaction,
  ): Promise<Maybe<ITypeGraph>> {
    const query = this.getGraphQueryByWhereUnique(where)

    return this.getGraphHelper(query, transaction)
  }

  getAdminTypes(
    where: Maybe<ITypesWhere>,
    transaction: ITransaction,
  ): Promise<Array<IType>> {
    const queryName = `getAdminTypes`
    const query = this.getQueryByWhere(where, undefined, queryName)

    return this.getAllHelper(query, transaction, queryName)
  }

  getUserTypes(
    userId: string,
    where: Maybe<ITypesWhere>,
    transaction: ITransaction,
  ): Promise<Array<IType>> {
    const queryName = `getUserTypes`
    const query = this.getQueryByWhere(where, userId, queryName)

    return this.getAllHelper(query, transaction, queryName)
  }

  getTypesByExactNames(
    names: Array<string>,
    transaction: ITransaction,
  ): Promise<Array<IType>> {
    const queryName = `getTypesByExactNames`
    const filter = `has(name) AND eq(name, ["${names.join('","')}"])`
    const query = this.queryFactory.forGet(filter, queryName)

    return this.getAllHelper(query, transaction, queryName)
  }

  async getTypeReferences(
    typeId: string,
    transaction: ITransaction,
  ): Promise<TypeReferencesResponse> {
    const queryName = `getTypeReferences`
    const query = this.queryFactory.forTypeReferences(typeId, queryName)

    const result = await this.dgraph.getOneNamed<TypeReferencesResponse>(
      transaction,
      query,
      queryName,
    )

    return { atoms: result?.atoms ?? [], fields: result?.fields ?? [] }
  }

  async getField(
    fieldId: string,
    transaction: ITransaction,
  ): Promise<Maybe<IField>> {
    const queryName = `getField`

    const query = this.queryFactory.forGetField(
      makeUidFilter(fieldId),
      queryName,
    )

    const result = await this.dgraph.getOneNamed<IField>(
      transaction,
      query,
      queryName,
    )

    if (!result) {
      return undefined
    }

    return FieldSchema.parse(result)
  }

  //
  // Helpers:
  //
  protected async getGraphHelper(
    query: string,
    transaction: ITransaction,
  ): Promise<Maybe<ITypeGraph>> {
    const result = await this.dgraph.executeQuery<ITypeGraph>(
      transaction,
      query,
    )

    const vertices = result?.vertices.map((node) => this.parse(node))

    return result ? { ...result, vertices } : undefined
  }

  private getGraphQueryByWhereUnique(where: ITypeGraphWhereUnique) {
    if (where.name) {
      const filter = `eq(name, "${where.name}")`

      return this.queryFactory.forGetGraph(filter)
    }

    if (where.atomId) {
      const filter = `uid(API_ID)`

      const extraQuery = `
        varAtom(func: type(${DgraphEntityType.Atom})) @filter(uid(${where.atomId})) {
          api {
              API_ID as uid
          }
        }`

      return this.queryFactory.forGetGraph(filter, extraQuery)
    }

    if (where.id) {
      const filter = `uid(${where.id})`

      return this.queryFactory.forGetGraph(filter)
    }

    throw new Error(`No query found for ${JSON.stringify(where)}`)
  }

  private getQueryByWhereUnique(where: ITypeWhereUnique, queryName: string) {
    if (where.name) {
      const filter = `eq(name, "${where.name}")`

      return this.queryFactory.forGet(filter, queryName)
    }

    if (where.atomId) {
      return this.queryFactory.forApiOfAtom(where.atomId, queryName)
    }

    if (where.enumTypeValueId) {
      return this.queryFactory.forGetByEnumTypeValue(
        where.enumTypeValueId,
        queryName,
      )
    }

    if (where.id) {
      const filter = `uid(${where.id})`

      return this.queryFactory.forGet(filter, queryName)
    }

    throw new Error(`No query found for ${JSON.stringify(where)}`)
  }

  private getQueryByWhere(
    where: Maybe<ITypesWhere>,
    ownerId: Maybe<string>,
    queryName: string,
  ) {
    const ownerFilter = ownerId
      ? `((NOT has(owner)) OR uid_in(owner, ${ownerId}))`
      : `NOT has(owner)`

    const nameFilter = where?.name && `match(name, "${where.name}", 6)`
    const idsFilter = where?.ids && `uid(${where.ids.join(',')})`
    const kindFilter = where?.kind ? `eq(typeKind, "${where.kind}")` : undefined

    const primitiveKindFilter = where?.primitiveKind
      ? `eq(primitiveKind, "${where.primitiveKind}")`
      : undefined

    const filter = combineFilters(
      [ownerFilter, nameFilter, idsFilter, kindFilter, primitiveKindFilter],
      'AND',
    )

    return this.queryFactory.forGet(filter, queryName)
  }
}
