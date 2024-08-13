import type { TypedDocumentString } from '@codelab/shared/infra/gql'
import { useCallback, useState } from 'react'
import useSWR, { type SWRResponse } from 'swr'
import { gqlFetch } from '../gql-fetch'

export const useLazySwr = <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [() => void, SWRResponse<TResult, any>] => {
  const [enabled, setEnabled] = useState(false)

  const swr = useSWR<TResult>(document, gqlFetch, {
    isPaused: () => !enabled,
  })

  const trigger = useCallback(() => {
    if (!enabled) {
      setEnabled(true)
    }
  }, [enabled])

  return [trigger, swr]
}
