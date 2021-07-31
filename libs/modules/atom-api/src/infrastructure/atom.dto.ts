import * as t from 'io-ts'

export const AtomDto = t.partial({
  id: t.string,
  title: t.string,
})

/**
 * Data from database used to hydrate into entity
 */
export type AtomDto = t.TypeOf<typeof AtomDto>
