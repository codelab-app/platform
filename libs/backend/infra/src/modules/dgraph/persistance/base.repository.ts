import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { Entity } from '@codelab/shared/abstract/types'
import { Txn } from 'dgraph-js-http'
import { ZodSchema } from 'zod'
import { DgraphRepository } from '../dgraph.repository'
import { DgraphEntityType } from '../dgraph-entity-type'
import { ITransaction } from '../transaction-manager'
import { IBaseRepository } from './base-repository.interface'
import { IMutationFactory } from './mutation-factory.interface'
import { IQueryFactory } from './query-factory.interface'
import { makeUidFilter, makeUidsFilter } from './query-utils'
import {
  makeCreateResponse,
  mergeAndMutate,
  randomBlankNode,
} from './repository-utils'

/**
 * Provides boilerplate for a Dgraph repository and serves as an example repository implementation.
 * Override any methods you need to customize.
 * Or add new ones to extend the functionality of the repository.
 */
export class BaseRepository<
  T extends Entity,
  TQueryFactory extends IQueryFactory,
  TMutationFactory extends IMutationFactory<T>,
> implements IBaseRepository<T>
{
  constructor(
    protected readonly dgraph: DgraphRepository,
    /**
     * The type of the entity being persisted. Used mostly for throwing better error messages and for
     * creating more descriptive query names
     */
    protected readonly entityType: DgraphEntityType,
    /**
     * The query factory used to create queries for this entity
     */
    protected readonly queryFactory: TQueryFactory,
    /**
     * The mutation factory used to create mutations for this entity
     */
    protected readonly mutationFactory: TMutationFactory,
    /**
     * Optional zod schema - both for validation and for common transformations,
     * like transforming object to array, or mismatched dgraph to entity fields.
     * */
    protected readonly schema?: ZodSchema<any>,
  ) {}

  async create(
    entity: T,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    entity = this.parse(entity)

    const uid = randomBlankNode()
    const mutation = this.mutationFactory.forCreate(entity, uid)
    const response = await transaction.mutate(mutation)

    return makeCreateResponse(response, uid)
  }

  protected async getExistingForUpdate(
    updatedEntity: T,
    transaction: ITransaction,
  ): Promise<T> {
    if (!updatedEntity.id) {
      throw new Error(`${this.entityType} must have an id to update`)
    }

    const existing = await this.getOne(updatedEntity.id, transaction)

    if (!existing) {
      throw new Error(
        `${this.entityType} with id ${updatedEntity.id} does not exist`,
      )
    }

    return existing
  }

  async update(updatedEntity: T, transaction: ITransaction): Promise<void> {
    updatedEntity = this.parse(updatedEntity)

    const existing = await this.getExistingForUpdate(updatedEntity, transaction)
    const mutation = this.mutationFactory.forUpdate(updatedEntity, existing)
    await transaction.mutate(mutation)
  }

  async delete(id: string, transaction: Txn): Promise<void> {
    const existing = await this.getOne(id, transaction)

    if (!existing) {
      throw new Error(`${this.entityType} does not exist`)
    }

    const mutation = this.mutationFactory.forDelete(existing)
    await transaction.mutate(mutation)
  }

  async deleteAll(ids: Array<string>, transaction: Txn): Promise<void> {
    if (!ids?.length) {
      return
    }

    const existing = await this.getAllByIds(ids, transaction)

    if (existing.length !== ids.length) {
      throw new Error(`Some of the ${this.entityType} do not exist`)
    }

    const mutations = existing.map((e) => this.mutationFactory.forDelete(e))

    await mergeAndMutate(transaction, ...mutations)
  }

  async getAll(transaction: ITransaction): Promise<Array<T>> {
    const queryName = `getAll${this.entityType}`
    const query = this.queryFactory.forGet(undefined, queryName)
    const all = await this.dgraph.getAllNamed<T>(transaction, query, queryName)

    return this.parseArray(all)
  }

  async getOne(id: string, transaction: ITransaction): Promise<T | undefined> {
    const queryName = `getOne${this.entityType}`
    const query = this.queryFactory.forGet(makeUidFilter(id), queryName)

    const result = await this.dgraph.getOneNamed<T>(
      transaction,
      query,
      queryName,
    )

    if (!result) {
      return undefined
    }

    return this.parse(result)
  }

  async getAllByIds(ids: Array<string>, transaction: Txn): Promise<Array<T>> {
    const queryName = `get${this.entityType}ByIds`
    const filter = makeUidsFilter(ids)
    const query = this.queryFactory.forGet(filter, queryName)
    const all = await this.dgraph.getAllNamed<T>(transaction, query, queryName)

    return this.parseArray(all)
  }

  protected parse(entity: T): T {
    return this.schema?.parse(entity) ?? entity
  }

  protected parseArray(entities: Array<T>): Array<T> {
    entities = entities ?? []

    return this.schema?.array().parse(entities) ?? entities
  }
}
