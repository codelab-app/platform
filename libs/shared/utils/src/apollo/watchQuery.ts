import {
  ApolloClient,
  OperationVariables,
  WatchQueryOptions,
} from '@apollo/client'
import { Observable } from 'rxjs'
// import { EventNameApp } from '@codelab/state/app'

/**
 * Issue with zen-observable, we convert to rxjs observable instead
 *
 * https://github.com/apollographql/apollo-client/issues/6144
 *
 * @param client
 * @param options
 */
export const watchQuery = <
  TData = any,
  TVariables = OperationVariables,
  TResultType = any
>(
  client: ApolloClient<any>,
  options: WatchQueryOptions<TVariables, TData>,
) => {
  /**
   * We wrap with rxjs observable because of this issue
   *
   * https://github.com/apollographql/apollo-client/issues/3721
   */
  return new Observable((subscriber) => {
    const subscription = client
      .watchQuery<TData, TVariables>(options)
      .subscribe(
        (value) => subscriber.next(value),
        (error) => subscriber.error(error),
        () => subscriber.complete(),
      )

    return () => subscription.unsubscribe()
  })
}
