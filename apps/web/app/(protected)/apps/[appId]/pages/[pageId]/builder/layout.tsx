import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutContainer } from './layout.container'

type LayoutProps = DashboardLayoutProps<
  'configPane' | 'header' | 'modal' | 'primarySidebar' | 'secondaryPopover',
  'pageId'
>

const Layout = ({
  children,
  configPane,
  header,
  modal,
  params,
  primarySidebar,
  secondaryPopover,
}: LayoutProps) => {
  const { pageId } = params

  return (
    <LayoutContainer pageId={pageId}>
      <DashboardLayout<
        | 'configPane'
        | 'header'
        | 'modal'
        | 'primarySidebar'
        | 'secondaryPopover',
        'pageId'
      >
        configPane={configPane}
        header={header}
        modal={modal}
        params={params}
        primarySidebar={primarySidebar}
        secondaryPopover={secondaryPopover}
      >
        {children}
      </DashboardLayout>
    </LayoutContainer>
  )
}

export default Layout
