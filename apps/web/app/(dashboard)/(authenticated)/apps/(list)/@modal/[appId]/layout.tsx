import type { ReactNode } from 'react'

import { preloadAppItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'

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
