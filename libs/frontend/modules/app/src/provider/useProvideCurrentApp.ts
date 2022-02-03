import { useEffect } from 'react'
import { useAppDispatch, useAppState } from '../hooks'
import { useGetAppsQuery } from '../store'
import { UseProvideCurrentApp } from './types'

export const useProvideCurrentApp = (appId: string): UseProvideCurrentApp => {
  const { setCurrentApp } = useAppDispatch()
  const { currentApp } = useAppState()

  const { data, isLoading } = useGetAppsQuery(
    { variables: { where: { id: appId } } },
    { skip: !appId },
  )

  useEffect(() => {
    const loadedApp = data?.apps[0]

    if (loadedApp) {
      setCurrentApp({ currentApp: loadedApp })
    }
  }, [isLoading])

  return { currentApp }
}
