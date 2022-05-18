import { useCallback, useEffect, useMemo, useState } from 'react'
import { extractErrorMessage } from './extractErrorMessage'
import { NotificationOptions, notify } from './notifications'

interface BaseOptions {
  notifyFactory?: typeof defaultNotifyFactory
}

export type UseLoadingStateOptions<TArgs extends Array<any>> = BaseOptions &
  (
    | ({ executeOnMount: true } & (TArgs extends [any, ...Array<any>]
        ? { executeOnMountArgs: TArgs }
        : { executeOnMountArgs?: never }))
    | { executeOnMount: false }
  )

export interface LoadingState<T> {
  isLoading: boolean
  error: string | null
  data: T | null
  isDone: boolean
}

export const defaultNotifyFactory = (error: any): NotificationOptions => ({
  title: 'Error',
  type: 'error',
  content: extractErrorMessage(error),
})

export const useStatefulExecutor = <TArgs extends Array<any>, TOut>(
  executor: (...args: TArgs) => Promise<TOut>,
  options?: UseLoadingStateOptions<TArgs>,
) => {
  const [state, setState] = useState<LoadingState<TOut>>({
    isLoading: false,
    error: null,
    data: null,
    isDone: false,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notifyFactoryCallback = useMemo(
    () => options?.notifyFactory || defaultNotifyFactory,
    [options?.notifyFactory],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executorCallback = useMemo(() => executor, [])

  const statefulExecutor = useCallback(
    async (...args: TArgs) => {
      setState({ isLoading: true, error: null, data: null, isDone: false })

      try {
        const data = await executorCallback(...args)
        setState({ isLoading: false, error: null, data, isDone: true })

        return data
      } catch (e) {
        setState({
          isLoading: false,
          error: extractErrorMessage(e),
          data: null,
          isDone: true,
        })

        console.error(e)

        if (notifyFactoryCallback) {
          notify(notifyFactoryCallback(e))
        }

        return null
      }
    },
    [executorCallback, notifyFactoryCallback],
  )

  useEffect(() => {
    if (options?.executeOnMount) {
      statefulExecutor(...(options.executeOnMountArgs ?? ([] as any)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [statefulExecutor, state] as const
}
