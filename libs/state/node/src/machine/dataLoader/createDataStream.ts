import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DataStreamEvents, EventNameDataStream } from './DataStreamEvents'
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
  return (): Observable<DataStreamEvents<TData, typeof dataStreamId>> =>
    observableFactory().pipe(
      map((result) => {
        if (result.type === QueryResultStatus.ERROR) {
          return {
            type: EventNameDataStream.FAILED_TO_LOAD_DATA,
            id: dataStreamId,
          }
        }

        return {
          type: EventNameDataStream.DATA_LOADED,
          data: result.data,
          id: dataStreamId,
        }
      }),
    )
}
