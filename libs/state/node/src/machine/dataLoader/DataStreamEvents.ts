import { EventObject } from 'xstate'

export enum EventNameDataLoader {
  DATA_LOADED = 'dataLoader.DATA_LOADED',
  FAILED_TO_LOAD_DATA = 'dataLoader.FAILED_TO_LOAD_DATA',
}

interface EventObjectWithId<TId> extends EventObject {
  id: TId
}

export interface EventDataLoaderDataLoaded<TData, TId>
  extends EventObjectWithId<TId> {
  type: EventNameDataLoader.DATA_LOADED
  data: TData
}

export interface EventDataLoaderFailed<TId> extends EventObjectWithId<TId> {
  type: EventNameDataLoader.FAILED_TO_LOAD_DATA
}

export type DataStreamEvents<TData, TId extends string = 'dataLoader'> =
  | EventDataLoaderDataLoaded<TData, TId>
  | EventDataLoaderFailed<TId>
