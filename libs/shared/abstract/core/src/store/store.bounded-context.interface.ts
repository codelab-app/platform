import { type Static, Type } from '@sinclair/typebox'
import { IStore } from './store.dto.interface'
import { IApi } from '../type'

export const IStoreBoundedContext = Type.Object({
  api: IApi,
  store: IStore,
})

export type IStoreBoundedContext = Static<typeof IStoreBoundedContext>
