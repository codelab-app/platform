import { ApplicationStoreProvider } from '@codelab/frontend-infra-mobx/store'
import type { PropsWithChildren } from 'react'
import React from 'react'

const ComponentsRouteLayout = async ({ children }: PropsWithChildren) => {
  return <ApplicationStoreProvider>{children}</ApplicationStoreProvider>
}

export default ComponentsRouteLayout
