import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutContainer } from './layout.container'

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
    <LayoutContainer componentId={componentId}>
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
    </LayoutContainer>
  )
}

export default Layout
