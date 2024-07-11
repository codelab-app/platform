import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useCallback, useState } from 'react'
import useSWR, { type SWRResponse } from 'swr'
import { swrFetcher } from './swr-fetcher'
import type { TypedDocumentString } from './graphql/graphql'

export const useLazySwr = <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
): [() => void, SWRResponse<TResult, any>] => {
  const [enabled, setEnabled] = useState(false)

  const swr = useSWR<TResult>(document, swrFetcher, {
    isPaused: () => !enabled,
  })

  const trigger = useCallback(() => {
    if (!enabled) {
      setEnabled(true)
    }
  }, [enabled])

  return [trigger, swr]
}
