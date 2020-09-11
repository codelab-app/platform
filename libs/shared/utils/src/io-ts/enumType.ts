import * as t from 'io-ts'

export class EnumType<A> extends t.Type<A> {
  public readonly _tag: 'EnumType' = 'EnumType'

  public enumObject!: object

  public constructor(e: object, name?: string) {
    super(
      name || 'enum',
      (u): u is A => {
        if (!Object.values(this.enumObject).find((v) => v === u)) {
          return false
        }

        // enum reverse mapping check
        if (typeof (this.enumObject as any)[u as string] === 'number') {
          return false
        }

        return true
      },
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity,
    )
    this.enumObject = e
  }
}

export const createEnumType = <T>(e: object, name?: string) =>
  new EnumType<T>(e, name)
