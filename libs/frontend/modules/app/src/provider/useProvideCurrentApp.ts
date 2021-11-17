import { useEffect } from 'react'
import { useAppDispatch, useAppState } from '../hooks'
import { useGetAppQuery } from '../store'
import { UseProvideCurrentApp } from './types'

export const useProvideCurrentApp = (appId: string): UseProvideCurrentApp => {
  const { setCurrentApp } = useAppDispatch()
  const { currentApp } = useAppState()

  const { data, isLoading } = useGetAppQuery(
    { variables: { input: { byId: { appId } } } },
    { skip: !appId },
  )

  useEffect(() => {
    if (data?.app) {
      setCurrentApp({ currentApp: data?.app })
    }
  }, [isLoading])

  return { currentApp }
}
