import type { LayoutProps } from '@codelab/frontend-presentation-view/templates'

import { preloadAppItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'

const Layout = async ({ children, params }: LayoutProps<'appId'>) => {
  const { appId } = await params

  void preloadAppItemQuery(appId)

  return <>{children}</>
}

export default Layout
