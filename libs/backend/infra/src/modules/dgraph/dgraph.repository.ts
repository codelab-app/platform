import {
  CreateResponsePort,
  NotFoundError,
} from '@codelab/backend/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Response, Txn } from 'dgraph-js-http'
import { Maybe } from 'graphql/jsutils/Maybe'
import { LoggerService, LoggerTokens } from '../logger'
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
  /* Turn on to log all queries/mutations*/
  private readonly DEBUG_MODE = false

  constructor(
    protected readonly dgraphService: DgraphService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  get client() {
    return this.dgraphService.client
  }

  /**
   * Wraps an action inside a dgraph transaction
   * The transaction is not committed automatically, you need to call txn.commit()
   * If not committed, the transaction is discarded after the action
   */
  async transactionWrapper<TResult>(action: (txn: Txn) => Promise<TResult>) {
    let txn = this.dgraphService.client.newTxn()

    try {
      return await action(txn)
    } catch (e: any) {
      // Retry
      if (e.message?.includes('Please retry')) {
        this.logger.log(
          `Dgraph error "${e.message}". Retrying`,
          'DgraphRepository',
        )
        await txn.discard()
        txn = this.dgraphService.client.newTxn()

        return await action(txn)
      }

      throw e
    } finally {
      await txn.discard()
    }
  }

  /**
   * Extracts the uid out of the uidsMap of a response
   * Throws error if the uid is not found
   *
   * @param response the response from the dgraph mutation
   * @param blankNodeLabel the label of the blank node (not the blank node itself: INCORRECT - '_:item', CORRECT - 'item')
   */
  getUid(response: Response, blankNodeLabel: string) {
    const id = (response.data as any).uids[blankNodeLabel] as string

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
  async executeMutation<TStringLabel extends Maybe<string>>(
    txn: Txn,
    mu: Mutation,
    blankNodeLabel?: TStringLabel,
  ): Promise<TStringLabel extends string ? string : void> {
    this.logOperation(mu)

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
   * Performs a query with the provided query builder and extracts the json data
   */
  async executeQuery<TResult, TVars = { [k: string]: any }>(
    txn: Txn,
    qb: DgraphQueryBuilder | string,
    vars?: TVars,
  ): Promise<TResult> {
    if (typeof qb === 'string') {
      this.logOperation(qb)

      if (vars) {
        return (await txn.queryWithVars(qb, vars)).data as TResult
      }

      return (await txn.query(qb)).data as TResult
    }

    const query = qb.build()

    this.logOperation(query)

    return this.executeNamedQuery<TResult>(txn, query, qb.queryName)
  }

  /**
   * Performs a query with the provided query string and extracts the json data by the specified query name
   */
  async executeNamedQuery<TResult>(
    txn: Txn,
    query: string,
    queryName: string,
  ): Promise<TResult> {
    this.logOperation(query)

    return ((await txn.query(query)).data as any)[queryName]
  }

  /**
   * Executes the provided mutation and returns a {@link CreateResponse} with the id of the entity, labeled by the blankNodeLabel. Note blankNodeLabel is the blank node uid, but without "_:"
   *
   * If you supply a Mutation object, you need to either use the default blankNodeLabel ("entity", respectively "_:entity") or supply your own as the third parameter
   *
   * If you supply a MutationFactoryFn you have the default blankNodeId (_:entity) as a parameter, so you can just use that
   */
  async create(
    txn: Txn,
    mutationOrFactory: Mutation | MutationFactoryFn,
    blankNodeLabel = 'entity',
  ): Promise<CreateResponsePort> {
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
    mutation: string | Mutation,
  ) {
    if (typeof query === 'string' && !query.trim().startsWith('{')) {
      query = `{ ${query}`
    }

    return this.executeMutation(txn, {
      mutation: `
        upsert {
          query ${query.toString()}
          mutation {
            ${mutation.toString()}
          }
        }
      `,
    })
  }

  /**
   * Shorthand for making a delete upsert that deletes all queried uids
   *
   * Query is pre-filled with required directives and alias. Do not add uid fields, just build up the query so that all nodes that should be deleted will be returned
   *
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
    extraMutation?: {
      delete?: any
      set?: any
    },
  ) {
    const uidsAlias = 'toDelete'

    const query = queryBuilder(
      new DgraphQueryBuilder()
        .addRecurseDirective()
        .addDirective(`@normalize`)
        .addFields(`${uidsAlias} as uid`),
    )

    const del = `
      uid(${uidsAlias}) * * .
      ${extraMutation?.delete ?? ''}
    `

    return this.executeUpsert(
      txn,
      query,
      `
        delete { ${del} }
        ${extraMutation?.set ? ` set { ${extraMutation.set}` : ''}
    `,
    )
  }

  async deleteEntity(txn: Txn, uid: string, extraNquads?: string) {
    return this.executeMutation(txn, {
      deleteNquads: `
    <${uid}> * * .
    ${extraNquads ? extraNquads : ''}
    `,
    })
  }

  async deleteEntities(txn: Txn, uids: Array<string>, extraNquads?: string) {
    return this.executeMutation(txn, {
      deleteNquads: `
    ${uids.map((uid) => ` <${uid}> * * . `).join('\n')}
    ${extraNquads ? extraNquads : ''}
    `,
    })
  }

  /**
   * Executes a query and returns the first found item or null if not found
   *
   * @param queryOrFactory
   * @param txn
   */
  async getOne<T>(
    txn: Txn,
    queryOrFactory: DgraphQueryBuilder | QueryBuilderFactoryFn,
  ): Promise<Nullable<T>> {
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
      throw errorFactory ? errorFactory() : new NotFoundError('Not found')
    }

    return result
  }

  /**
   * Executes a named query and returns the first found item or throws if not found
   */
  async getOneOrThrowNamed<T>(
    txn: Txn,
    query: string,
    queryName: string,
    errorFactory?: () => Error,
  ): Promise<T> {
    const result = await this.getOneNamed<T>(txn, query, queryName)

    if (!result) {
      throw errorFactory ? errorFactory() : new Error('Not found')
    }

    return result
  }

  /**
   * Executes a query and returns the first found item or null if not found
   *
   * @param txn
   * @param queryOrFactory
   * @param queryName t
   */
  async getOneNamed<TResponse>(
    txn: Txn,
    queryOrFactory: string | QueryFactoryFn,
    queryName: string,
  ): Promise<Nullable<TResponse>> {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    const response = await this.executeNamedQuery<Array<TResponse>>(
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
  async getAllNamed<TResult>(
    txn: Txn,
    queryOrFactory: string | QueryFactoryFn,
    queryName: string,
  ) {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    return this.executeNamedQuery<Array<TResult>>(txn, query, queryName)
  }

  /** Same as executeQuery */
  async getAll<TResult>(
    txn: Txn,
    queryOrFactory: DgraphQueryBuilder | QueryBuilderFactoryFn,
  ) {
    const query =
      typeof queryOrFactory === 'function'
        ? await queryOrFactory()
        : queryOrFactory

    return this.executeQuery<Array<TResult>>(txn, query)
  }

  private logOperation(op: string | any) {
    if (typeof op !== 'string') {
      op = JSON.stringify(op, null, 2)
    }

    if (this.DEBUG_MODE && process.env.NODE_ENV !== 'production') {
      this.logger.debug(op)
    }
  }
}
