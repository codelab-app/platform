import { useCallback, useMemo, useState } from 'react'
import { extractErrorMessage } from './extractErrorMessage'
import { NotificationOptions, notify } from './notifications'

export interface AsyncState<T> {
  isLoading: boolean
  error: string | null
  data: T | null
}

const defaultNotifyFactory = (error: any): NotificationOptions => ({
  title: 'Error',
  type: 'error',
  content: extractErrorMessage(error),
})

export const useAsyncState = <TArgs extends Array<any>, TOut>(
  executor: (...args: TArgs) => Promise<TOut>,
  notifyFactory: typeof defaultNotifyFactory | null = defaultNotifyFactory,
) => {
  const [state, setState] = useState<AsyncState<TOut>>({
    isLoading: false,
    error: null,
    data: null,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notifyFactoryCallbacked = useMemo(() => notifyFactory, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executorCallbacked = useMemo(() => executor, [])

  const statefulExecutor = useCallback(
    async (...args: TArgs) => {
      setState({ isLoading: true, error: null, data: null })

      try {
        const data = await executorCallbacked(...args)
        setState({ isLoading: false, error: null, data })

        return data
      } catch (e) {
        setState({
          isLoading: false,
          error: extractErrorMessage(e),
          data: null,
        })

        if (notifyFactoryCallbacked) {
          notify(notifyFactoryCallbacked(e))
        }

        return null
      }
    },
    [executorCallbacked, notifyFactoryCallbacked],
  )

  return [statefulExecutor, state] as const
}
