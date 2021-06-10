import { DgraphFilter } from './dgraph-filter'

export class UidFilter extends DgraphFilter {
  private _uid?: string

  constructor(uid: string) {
    super()

    this._uid = uid
  }

  build(): string {
    if (!this._uid) {
      throw new Error("Can't build UidFilter, uid not provided")
    }

    this.withFilter(`uid(${this._uid})`)

    return super.build()
  }
}
