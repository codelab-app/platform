import type { TypedDocumentString } from '@codelab/shared/infra/gql'

import { gqlFetch } from '@codelab/shared/infra/fetch'
import { useCallback, useState } from 'react'
import useSWR, { type SWRResponse } from 'swr'

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
