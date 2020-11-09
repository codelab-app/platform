import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DataStreamEvents, EventNameDataLoader } from './DataStreamEvents'
import { QueryResult, QueryResultStatus } from './handleResult'

export const createDataStream = <
  TObservableFactory extends () => Observable<QueryResult<any>>,
  TData = ReturnType<TObservableFactory> extends Observable<
    QueryResult<infer TResult>
  >
    ? TResult
    : never
>(
  observableFactory: TObservableFactory,
  dataStreamId = 'dataStream',
) => {
  return () =>
    observableFactory().pipe(
      map(
        (result): DataStreamEvents<TData, typeof dataStreamId> => {
          if (result.type === QueryResultStatus.ERROR) {
            return {
              type: EventNameDataLoader.FAILED_TO_LOAD_DATA,
              id: dataStreamId,
            }
          }

          return {
            type: EventNameDataLoader.DATA_LOADED,
            data: result.data,
            id: dataStreamId,
          }
        },
      ),
    )
}
