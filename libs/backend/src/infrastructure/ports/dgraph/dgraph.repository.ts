import { Injectable } from '@nestjs/common'
import { Mutation, Request, Response, Txn } from 'dgraph-js'
import { CreateResponse } from '../../../application/graphql/create.response'
import { DgraphService } from './dgraph.service'
import { DgraphQueryBuilder } from './query-building'

export type MutationFactoryFn = (
  blankNodeUid: string,
) => Mutation | Promise<Mutation>

export type QueryFactoryFn = () => string | Promise<string>
export type QueryBuilderFactoryFn = () =>
  | DgraphQueryBuilder
  | Promise<DgraphQueryBuilder>

/**
 * Handles dgraph queries and mutations
 */
@Injectable()
export class DgraphRepository {
  constructor(protected readonly dgraphService: DgraphService) {}

  get client() {
    return this.dgraphService.client
  }

  /**
   * Wraps an action inside a dgraph transaction
   * The transaction is not committed automatically, you need to call txn.commit()
   * If not committed, the transaction is discarded after the action
   * */
  async transactionWrapper<TResult>(action: (txn: Txn) => Promise<TResult>) {
    const txn = this.dgraphService.client.newTxn()

    try {
      return await action(txn)
    } finally {
      await txn.discard()
    }
  }

  /**
   * Extracts the uid out of the uidsMap of a response
   * Throws error if the uid is not found
   * @param response the response from the dgraph mutation
   * @param blankNodeLabel the label of the blank node (not the blank node itself: INCORRECT - '_:item', CORRECT - 'item')
   */
  getUid(response: Response, blankNodeLabel: string) {
    const id = response.getUidsMap().get(blankNodeLabel)

    if (!id) {
      throw new Error(
        `Error while processing dgraph response, uid with label ${blankNodeLabel} not found`,
      )
    }

    return id
  }

  /**
   * Performs a mutation, commits the transaction and returns the UID of the labeled blank node (if supplied)
   */
  async executeMutation<TStringLabel extends string | undefined>(
    txn: Txn,
    mu: Mutation,
    blankNodeLabel?: TStringLabel,
  ): Promise<TStringLabel extends string ? string : void> {
    const response = await txn.mutate(mu)

    await txn.commit()

    if (typeof blankNodeLabel === 'string') {
      return this.getUid(
        response,
        blankNodeLabel,
      ) as TStringLabel extends string ? string : void
    }

    return void 0 as TStringLabel extends string ? string : void
  }

  /**
   * Performs a set of mutations, and commits the transaction
   */
  async executeMutations(txn: Txn, mutations: Array<Mutation>) {
    const req = new Request()

    req.setMutationsList(mutations)

    const response = await txn.doRequest(req)

    await txn.commit()

    return response
  }

  /**
   * Performs a query with the provided query builder and extracts the json data
   */
  async executeQuery<TResult>(
    txn: Txn,
    qb: DgraphQueryBuilder,
  ): Promise<Array<TResult>> {
    return this.executeNamedQuery(txn, qb.build(), qb.queryName)
  }

  /**
   * Performs a query with the provided query string and extracts the json data by the specified query name
   */
  async executeNamedQuery<TResult>(
    txn: Txn,
    query: string,
    queryName: string,
  ): Promise<Array<TResult>> {
    return (await txn.query(query)).getJson()[queryName] || null
  }

  /**
   * Executes the provided mutation and returns a {@link CreateResponse} with the id
   * of the entity, labeled by the blankNodeLabel
   *
   * If you supply a Mutation object, you need to either use the default blankNodeLabel ("entity", respectively "_:entity")
   * or supply your own as the third parameter
   *
   * If you supply a MutationFactoryFn you have the default blankNodeId (_:entity) as a parameter, so you can just use that
   */
  async create(
    txn: Txn,
    mutationOrFactory: Mutation | MutationFactoryFn,
    blankNodeLabel = 'entity',
  ): Promise<CreateResponse> {
    const mutation =
      typeof mutationOrFactory === 'function'
        ? await mutationOrFactory(`_:${blankNodeLabel}`)
        : mutationOrFactory

    const id = await this.executeMutation(txn, mutation, blankNodeLabel)

    return { id }
  }

  /**
   * Performs an upsert (query + mutation) request and commits it
   */
  async executeUpsert(
    txn: Txn,
    query: string | DgraphQueryBuilder,
    mutations: Array<Mutation>,
  ) {
    const req = new Request()

    req.setQuery(query.toString())
    req.setMutationsList(mutations)
    req.setCommitNow(true)

    return await txn.doRequest(req)
  }

  /**
   * Shorthand for making a delete upsert that deletes all queried uids
   * Query is pre-filled with required directives and alias. Do not add uid fields,
   * just build up the query so that all nodes that should be deleted will be returned
   * Note that the query is a recursive one, don't add inner fields, only root ones
   *
   * @example
   * this.dgraph.executeUpsertDeleteAll(txn, (q) =>
   *   q.addJsonFields<DgraphApp & DgraphPage & DgraphElement>({
   *        pages: true,
   *        root: true,
   *        children: true,
   *        props: true,
   *      })
   *   .addTypeFilterDirective(DgraphEntityType.App)
   *   .setUidFunc(appId),
   *   )
   *
   */
  async executeUpsertDeleteAll(
    txn: Txn,
    queryBuilder: (query: DgraphQueryBuilder) => DgraphQueryBuilder,
    extraMutations?: Array<Mutation>,
  ) {
    const uidsAlias = 'toDelete'

    const query = queryBuilder(
      new DgraphQueryBuilder()
        .addRecurseDirective()
        .addDirective(`@normalize`)
        .addFields(`${uidsAlias} as uid`),
    )

    const mu = new Mutation()
    mu.setDelNquads(`uid(${uidsAlias}) * * .`)

    return await this.executeUpsert(txn, query, [mu, ...(extraMutations || [])])
  }

  async deleteEntity(txn: Txn, uid: string, extraNquads?: string) {
    const mu = new Mutation()
    mu.setDelNquads(`
    <${uid}> * * .
    ${extraNquads ? extraNquads : ''}
    `)

    return this.executeMutation(txn, mu)
  }

  /**
   * Executes a query and returns the first found item or null if not found
   * @param queryOrFactory
   * @param txn
   */
  async getOne<T>(
    txn: Txn,
    queryOrFactory: DgraphQueryBuilder | QueryBuilderFactoryFn,
  ): Promise<T | null> {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    return this.getOneNamed<T>(txn, query.build(), query.queryName)
  }

  /**
   * Executes a query and returns the first found item or throws if not found
   */
  async getOneOrThrow<T>(
    txn: Txn,
    queryOrFactory: DgraphQueryBuilder | QueryBuilderFactoryFn,
    errorFactory?: () => Error,
  ): Promise<T> {
    const result = await this.getOne<T>(txn, queryOrFactory)

    if (!result) {
      throw errorFactory ? errorFactory() : new Error('Not found')
    }

    return result
  }

  /**
   * Executes a query and returns the first found item or null if not found
   * @param txn
   * @param queryOrFactory
   * @param queryName t
   */
  async getOneNamed<TResponse>(
    txn: Txn,
    queryOrFactory: string | QueryFactoryFn,
    queryName: string,
  ): Promise<TResponse | null> {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    const response = await this.executeNamedQuery<TResponse>(
      txn,
      query,
      queryName,
    )

    if (!response || !response.length) {
      return null
    }

    return response[0]
  }

  /** Same as executeNamedQuery */
  async getAllNamed<T>(
    txn: Txn,
    queryOrFactory: string | QueryFactoryFn,
    queryName: string,
  ) {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    return this.executeNamedQuery<T>(txn, query, queryName)
  }

  /** Same as executeQuery */
  async getAll<T>(
    txn: Txn,
    queryOrFactory: DgraphQueryBuilder | QueryBuilderFactoryFn,
  ) {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    return this.executeQuery<T>(txn, query)
  }
}
