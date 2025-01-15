import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutContainer } from './layout.container'

type LayoutProps = DashboardLayoutProps<'header', 'pageId'>

const Layout = ({ children, header, params }: LayoutProps) => {
  const { pageId } = params

  return (
    <LayoutContainer pageId={pageId}>
      <DashboardLayout<'header', 'pageId'> header={header} params={params}>
        {children}
      </DashboardLayout>
    </LayoutContainer>
  )
}

export default Layout
