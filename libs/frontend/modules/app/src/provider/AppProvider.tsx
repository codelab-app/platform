import { ConditionalView } from '@codelab/frontend/view/components'
import React, { PropsWithChildren } from 'react'
import { AppProviderProps } from './types'
import { useProvideCurrentApp } from './useProvideCurrentApp'

export const _AppProvider = ({
  appId,
  children,
}: PropsWithChildren<AppProviderProps>) => {
  const { currentApp } = useProvideCurrentApp(appId)

  return <ConditionalView condition={!!currentApp}>{children}</ConditionalView>
}

export const AppProvider = React.memo(_AppProvider, (prev, next) => {
  return prev.appId !== next.appId
})
