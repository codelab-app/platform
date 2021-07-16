import { DgraphFilter } from './dgraph-filter'

// This can also be used when building upsert blocks
export class UidFilter extends DgraphFilter {
  private readonly _uid?: string

  public get uid() {
    return this._uid
  }

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
