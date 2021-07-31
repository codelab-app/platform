import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from '../../interfaces'
import { IBuildable } from '../i-query-builder'
import { DgraphFilter, FilterConnection } from './dgraph-filter'

/** https://dgraph.io/docs/query-language/functions/#inequality */
export class EqFilter<
  TEntity extends DgraphEntity<any> | unknown = unknown,
> extends DgraphFilter {
  private readonly _predicate?: keyof TEntity | string

  private readonly _value?: string

  private _additionalString = ''

  constructor(
    predicate: TEntity extends DgraphEntity<any> ? keyof TEntity : string,
    value: string,
  ) {
    super()
    this._predicate = predicate
    this._value = value
  }

  build(): string {
    if (!this._predicate) {
      throw new Error("Can't build EqFilter, predicate not provided")
    }

    const valueString = this.getValueString()

    this.withFilter(
      `eq(${this._predicate}, ${valueString}) ${this._additionalString}`,
    )

    return super.build()
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
  }

  or(otherFilter: DgraphFilter | IBuildable) {
    if (otherFilter instanceof DgraphFilter) {
      otherFilter.setConnectionPrefix(FilterConnection.OR)
      this._additionalString += ' ' + otherFilter.build()
    } else {
      this._additionalString += ' or ' + otherFilter.build()
    }
  }

  private getValueString() {
    if (!this._value) {
      throw new Error("Can't build EqFilter, value not provided")
    }

    if (
      this._value.startsWith('"') ||
      this._value.startsWith('_:') ||
      this._value.endsWith(')') ||
      this._value == '*'
    ) {
      return this._value
    }

    if (this._value.startsWith('0x')) {
      return `<${this._value}>`
    }

    return `"${this._value}"`
  }

  static dgraphType(value: DgraphEntityType) {
    return new EqFilter('dgraph.type', value)
  }
}
