// Deprecated
import { Observable } from 'rxjs'
import { Required } from 'utility-types'
import { v4 as uuidv4 } from 'uuid'
import { Actor, createMachine } from 'xstate'
import { QueryResult } from '../handleResult'
// import { assertEventType } from '@codelab/alpha/state/app'
// import { EventNameDataLoader, DataStreamEvents } from './DataStreamEvents'

enum Actions {
  submitData = 'submitData',
  notifyAboutError = 'notifyAboutError',
  spawnDataStream = 'spawnDataStream',
}

export const createDataLoaderMachine = <
  TObservableFactory extends () => Observable<QueryResult<any>>,
  TData = ReturnType<TObservableFactory> extends Observable<
    QueryResult<infer TResult>
  >
    ? TResult
    : never
>(
  observableFactory: TObservableFactory,
) => {
  type ObservableEvents =
    | { type: '$NEW_DATA'; data: TData }
    | { type: '$ERROR' }

  type Events = ObservableEvents

  type Context = {
    observable?: Actor<any, ObservableEvents>
  }

  type SpawnedContext = Required<Context, 'observable'>
  type State =
    | { value: 'idle'; context: SpawnedContext }
    | { value: 'init'; context: SpawnedContext }
    | { value: 'error'; context: SpawnedContext }
    | { value: 'loaded'; context: SpawnedContext }
    | { value: 'waitingToFetch'; context: Context }

  return createMachine<Context, Events, State>(
    {
      id: `data-loader-${uuidv4()}`,
      initial: 'init',
      context: {},
      on: {
        // FETCH: { target: 'loading' },
        $ERROR: { target: 'error', actions: Actions.notifyAboutError },
        $NEW_DATA: { target: 'loaded', actions: Actions.submitData },
      },
      states: {
        init: {
          entry: Actions.spawnDataStream,
          always: { target: 'idle' },
        },
        error: {
          always: { target: 'idle' },
        },
        loaded: {
          always: { target: 'idle' },
        },
        idle: {},
      },
    },
    {
      actions: {
        // [Actions.submitData]: sendParent<Context, Events, ParentEvents<TData>>(
        //     (_ctx, event) => {
        //         assertEventType(event, EventNameDataLoader.DATA_LOADED)
        //         return { type: EventNameDataLoader.DATA_LOADED, data: event.data }
        //     },
        // ),
        // [Actions.notifyAboutError]: sendParent<Context, Events, ParentEvents<TData>>(
        //     EventNameDataLoader.FAILED_TO_LOAD_DATA,
        // ),
        // [Actions.spawnDataStream]: assign<any, any>({
        //     dataStream: () => spawn(observableFactory())
        // }),
      },
    },
  )
}

// export type { ParentEvents as DataLoaderEvents }
