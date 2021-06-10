import { IDgraphQueryFilter } from '../i-query-builder'

export class DgraphFilter implements IDgraphQueryFilter {
  private _connectionPrefix?: string

  private _filter?: string

  withFilter(filter: string) {
    this._filter = filter

    return this
  }

  /** https://dgraph.io/docs/query-language/connecting-filters/ */
  withConnectionPrefix(connectionPrefix: FilterConnection) {
    this._connectionPrefix = connectionPrefix
  }

  build(): string {
    if (!this._filter) {
      throw new Error("Can't build Filter, filter stirng not provided")
    }

    return `${this._connectionPrefix || ''} ${this._filter}`
  }
}

export enum FilterConnection {
  OR = 'OR',
  AND = 'AND',
  NOT = 'NOT',
}
