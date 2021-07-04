import { DgraphFilter } from './dgraph-filter'

/** https://dgraph.io/docs/query-language/functions/#inequality */
export class EqFilter extends DgraphFilter {
  private readonly _predicate?: string

  private readonly _value?: string

  constructor(predicate: string, value: string) {
    super()
    this._predicate = predicate
    this._value = value
  }

  build(): string {
    if (!this._predicate) {
      throw new Error("Can't build EqFilter, predicate not provided")
    }

    if (!this._value) {
      throw new Error("Can't build EqFilter, value not provided")
    }

    this.withFilter(`eq(${this._predicate}, ${this._value})`)

    return super.build()
  }
}
