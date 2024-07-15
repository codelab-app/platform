import type { TypedDocumentString } from '@codelab/frontend/infra/gql'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useCallback, useState } from 'react'
import useSWR, { type SWRResponse } from 'swr'
import { swrFetcher } from '../swr-fetcher'

export const useLazySwr = <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
