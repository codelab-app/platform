import { type Static, Type } from '@sinclair/typebox'
import { IApi } from '../type'
import { IStore } from './store.dto.interface'

export const IStoreAggregate = Type.Object({
  api: IApi,
  store: IStore,
})

export type IStoreAggregate = Static<typeof IStoreAggregate>
