import { type Static, Type } from '@sinclair/typebox'
import { IApi } from '../type'
import { IStore } from './store.dto.interface'

export const IStoreBoundedContext = Type.Object({
  api: IApi,
  store: IStore,
})

export type IStoreBoundedContext = Static<typeof IStoreBoundedContext>
