import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import {
  appItemQuery,
  preloadAppItemQuery,
} from '@codelab/frontend-application-app/use-cases/app-item'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ appId: string }>
}) => {
  const { appId } = await params
  void preloadAppItemQuery(appId)

  return <>{children}</>
}

export default Layout
