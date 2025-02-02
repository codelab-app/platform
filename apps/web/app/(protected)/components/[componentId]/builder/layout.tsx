import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

type LayoutProps = DashboardLayoutProps<
  'configPane' | 'header' | 'modal' | 'primarySidebar' | 'secondaryPopover',
  'componentId'
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
  const { componentId } = params

  return (
    <LayoutClient componentId={componentId}>
      <DashboardLayout<
        | 'configPane'
        | 'header'
        | 'modal'
        | 'primarySidebar'
        | 'secondaryPopover',
        'componentId'
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
    </LayoutClient>
  )
}

export default Layout
