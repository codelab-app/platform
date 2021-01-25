import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

export const AppDTO = t.partial({
  id: t.string,
  title: t.string,
})

export type AppDTO = t.TypeOf<typeof AppDTO>

/**
 * App ValeObject Codec
 */
export const AppVO = t.type({
  title: t.string,
})

export type AppVO = t.TypeOf<typeof AppVO>

/**
 * App Entity Codec
 */
export const AppEntity = t.intersection([
  t.type({
    id: UUID,
  }),
  AppVO,
])

export type AppEntity = t.TypeOf<typeof AppEntity>
