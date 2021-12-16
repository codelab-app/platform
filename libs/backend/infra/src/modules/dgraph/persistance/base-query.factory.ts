import { DgraphEntityType } from '@codelab/backend/infra'
import { IQueryFactory } from './query-factory.interface'

export const makeFilterString = (filter?: string) =>
  filter ? `@filter(${filter})` : ''

/**
 * Provides boilerplate for a base set of dgraph queries and serves as example of integrating a repository with dgraph queries
 * Override any methods you need to customize.
 * Or add new ones if new queries are needed.
 */
export class BaseQueryFactory implements IQueryFactory {
  constructor(public readonly entityType: DgraphEntityType) {}

  protected makeFilterString(filter?: string): string {
    return makeFilterString(filter)
  }

  /**
   * Default get query, which can be used for single or multiple entities.
   *
   *  Uses the 'expand(_all_)' query to get all fields. Won't work for related entities,
   * override this method if you need to get them.
   *
   * Provides filtering through the `filter` parameter, don't set it to '@filter(x)', just 'x'
   * */
  forGet(filter?: string, queryName?: string) {
    const filterString = this.makeFilterString(filter)

    queryName = queryName || `get${this.entityType}`

    return `{
      ${queryName}(func: type(${this.entityType})) ${filterString} {
        id: uid
        expand(_all_)
      }
    }`
  }
}
