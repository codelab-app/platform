import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

export const PageDTO = t.partial({
  id: t.string,
  title: t.string,
})

export type PageDTO = t.TypeOf<typeof PageDTO>

export const PageVO = t.type({
  title: t.string,
})

export type PageVO = t.TypeOf<typeof PageVO>

export const PageEntity = t.intersection([t.type({ id: UUID }), PageVO])

export type PageEntity = t.TypeOf<typeof PageEntity>
