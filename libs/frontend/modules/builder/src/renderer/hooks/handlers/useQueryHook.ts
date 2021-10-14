/* eslint-disable react-hooks/rules-of-hooks */
import { QueryHookConfigFragment } from '@codelab/frontend/modules/element'
import { useExecuteLambdaMutation } from '@codelab/frontend/modules/lambda'
import axios from 'axios'
import { useQuery } from 'react-query'
import { HookHandler } from '../HookHandler'

export const useQueryHook: HookHandler = (config: QueryHookConfigFragment) => {
  let body = config.body ?? undefined

  try {
    if (body) {
      body = JSON.parse(body)
    }
  } catch (e) {
    //
  }

  const lambdaId = config.lambdaId

  if (lambdaId) {
    const [executeLambda] = useExecuteLambdaMutation()

    return useQuery(config.queryKey, (context) =>
      executeLambda({
        variables: {
          input: {
            lambdaId,
            payload: JSON.stringify(context),
          },
        },
      }).then((r) => {
        try {
          const payload = r.data?.executeLambda?.payload

          return payload ? JSON.parse(payload) : undefined
        } catch (e) {
          console.warn('Error while processing lambda payload: ', e)
        }

        return undefined
      }),
    )
  }

  const { method, url } = config

  if (!url) {
    return
  }

  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isStale,
    isSuccess,
    status,
  } = useQuery(config.queryKey, (context) =>
    axios({
      data: body,
      url,
      method: method ?? 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((r) => r.data),
  )

  return {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isStale,
    isSuccess,
    status,
  }
}
