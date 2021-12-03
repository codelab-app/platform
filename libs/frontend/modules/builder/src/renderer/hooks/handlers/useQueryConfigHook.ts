/* eslint-disable react-hooks/rules-of-hooks */

import {
  IQueryConfigHookConfig,
  QueryMethod,
} from '@codelab/shared/abstract/core'
import axios, { Method } from 'axios'
import { useQuery } from 'react-query'
import { HookHandler } from '../HookHandler'

export const useQueryConfigHook: HookHandler = (
  config: IQueryConfigHookConfig,
) => {
  let body = config.body ?? undefined

  try {
    if (body) {
      body = JSON.parse(body)
    }
  } catch (e) {
    //
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
      // GraphQL Codegen is renaming enum
      method: (method ?? QueryMethod.Get).toUpperCase() as Method,
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
