import { IDgraphQueryFilter } from '../i-query-builder'

export class DgraphFilter implements IDgraphQueryFilter {
  private _connectionPrefix?: string

  private _filter?: string

  /**
   * @param filter e.g. "@filter(uid(x))"
   */
  withFilter(filter: string) {
    this._filter = filter

    return this
  }

  /** https://dgraph.io/docs/query-language/connecting-filters/ */
  setConnectionPrefix(connectionPrefix: FilterConnection | undefined) {
    this._connectionPrefix = connectionPrefix

    return this
  }

  build(): string {
    if (!this._filter) {
      throw new Error("Can't build Filter, filter string not provided")
    }

    return `${this._connectionPrefix || ''} ${this._filter}`
  }
}

export enum FilterConnection {
  OR = 'OR',
  AND = 'AND',
  NOT = 'NOT',
}
