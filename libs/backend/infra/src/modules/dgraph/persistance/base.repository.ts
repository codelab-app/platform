import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { Txn } from 'dgraph-js-http'
import { ZodSchema } from 'zod'
import { DgraphRepository } from '../dgraph.repository'
import { DgraphEntityType } from '../dgraph-entity-type'
import { ITransaction } from '../transaction-manager'
import { mergeMutations } from '../utils/mergeMutations'
import { IBaseRepository } from './base-repository.interface'
import { IMutationFactory } from './mutation-factory.interface'
import { IQueryFactory } from './query-factory.interface'

/**
 * Provides boilerplate for a Dgraph repository and serves as an example repository implementation.
 * Override any methods you need to customize.
 * Or add new ones to extend the functionality of the repository.
 */
export class BaseRepository<
  T extends { id?: string | null },
  TQueryFactory extends IQueryFactory,
  TMutationFactory extends IMutationFactory<T>,
> implements IBaseRepository<T>
{
  constructor(
    protected readonly dgraph: DgraphRepository,
    protected readonly entityType: DgraphEntityType,
    protected readonly queryFactory: TQueryFactory,
    protected readonly mutationFactory: TMutationFactory,
    protected readonly schema?: ZodSchema<any>,
  ) {}

  async create(
    entity: T,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    entity = this.schema?.parse(entity) ?? entity

    const uid = DgraphRepository.randomBlankNode()
    const mutation = this.mutationFactory.forCreate(entity, uid)
    const response = await transaction.mutate(mutation)

    return { id: DgraphRepository.getUid(response, uid) }
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
      throw new Error(`${this.entityType} does not exist`)
    }

    return existing
  }

  async update(updatedEntity: T, transaction: ITransaction): Promise<void> {
    updatedEntity = this.schema?.parse(updatedEntity) ?? updatedEntity

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
    if (ids?.length === 0) {
      return
    }

    const existing = await this.getAllByIds(ids, transaction)

    if (existing.length !== ids.length) {
      throw new Error(`Some of the ${this.entityType} do not exist`)
    }

    const mutations = existing.map((e) => this.mutationFactory.forDelete(e))
    const merged = mergeMutations(...mutations)
    await transaction.mutate(merged)
  }

  async getAll(transaction: ITransaction): Promise<Array<T>> {
    const queryName = `getAll${this.entityType}`

    const all = await this.dgraph.getAllNamed<T>(
      transaction,
      this.queryFactory.forGet(undefined, queryName),
      queryName,
    )

    return this.schema?.array().parse(all) ?? all ?? []
  }

  async getOne(id: string, transaction: ITransaction): Promise<T | undefined> {
    const queryName = `getOne${this.entityType}`

    const result = await this.dgraph.getOneNamed<T>(
      transaction,
      this.queryFactory.forGet(`uid(${id})`, queryName),
      queryName,
    )

    if (!result) {
      return undefined
    }

    return this.schema?.parse(result) ?? result
  }

  async getAllByIds(ids: Array<string>, transaction: Txn): Promise<Array<T>> {
    const queryName = `get${this.entityType}ByIds`

    const all = await this.dgraph.getAllNamed<T>(
      transaction,
      this.queryFactory.forGet(
        ids.length ? `uid(${ids.join(',')})` : undefined,
        queryName,
      ),
      queryName,
    )

    return this.schema?.array().parse(all) ?? all
  }
}
