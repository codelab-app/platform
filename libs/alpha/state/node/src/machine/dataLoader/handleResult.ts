import { ObservableQuery } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { Observable } from 'rxjs'

export enum QueryResultStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type QueryResult<TTransformedData> =
  | { type: QueryResultStatus.SUCCESS; data: TTransformedData }
  | { type: QueryResultStatus.ERROR; errors: ReadonlyArray<GraphQLError> }

export const handleQueryResult = <TQueryType, TVariables, TResultType>(
  query: ObservableQuery<TQueryType, TVariables>,
  mapper: (queryResult: TQueryType) => TResultType,
): Observable<QueryResult<TResultType>> =>
  new Observable<QueryResult<TResultType>>((observer) => {
    const subscription = query.subscribe((result) => {
      if (result.errors) {
        console.debug('GraphQL error: ', result.errors)
        observer.next({ type: QueryResultStatus.ERROR, errors: result.errors })
      } else if (!result.loading) {
        observer.next({
          type: QueryResultStatus.SUCCESS,
          data: mapper(result.data),
        })
      }
    })

    return () => subscription.unsubscribe()
  })
