import { Maybe } from '@codelab/shared/abstract/types'
import { IBuildable, IDgraphQueryFilter } from '../i-query-builder'

export class DgraphFilter implements IDgraphQueryFilter {
  private _connectionPrefix?: string

  private _filter?: string

  private _additionalString = ''

  /**
   * @param filter e.g. "@filter(uid(x))"
   */
  withFilter(filter: string) {
    this._filter = filter

    return this
  }

  /** https://dgraph.io/docs/query-language/connecting-filters/ */
  setConnectionPrefix(connectionPrefix: Maybe<FilterConnection>) {
    this._connectionPrefix = connectionPrefix

    return this
  }

  build(): string {
    if (!this._filter) {
      throw new Error("Can't build Filter, filter string not provided")
    }

    return `${this._connectionPrefix || ''} ${this._filter}  ${
      this._additionalString
    }`
  }

  and(otherFilter: DgraphFilter | IBuildable | string) {
    if (otherFilter instanceof DgraphFilter) {
      otherFilter.setConnectionPrefix(FilterConnection.AND)
      this._additionalString += ' ' + otherFilter.build()
    } else {
      this._additionalString +=
        ' and ' +
        (typeof otherFilter === 'string' ? otherFilter : otherFilter.build())
    }

    return this
  }

  or(otherFilter: DgraphFilter | IBuildable) {
    if (otherFilter instanceof DgraphFilter) {
      otherFilter.setConnectionPrefix(FilterConnection.OR)
      this._additionalString += ' ' + otherFilter.build()
    } else {
      this._additionalString += ' or ' + otherFilter.build()
    }

    return this
  }
}

export enum FilterConnection {
  OR = 'OR',
  AND = 'AND',
  NOT = 'NOT',
}
