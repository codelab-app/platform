import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { preloadAppItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'

const Layout = async ({ children, params }: LayoutProps<'appId'>) => {
  const { appId } = await params

  preloadAppItemQuery(appId)

  return <>{children}</>
}

export default Layout
