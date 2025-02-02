import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

type LayoutProps = Omit<
  DashboardLayoutProps<
    'configPane' | 'header' | 'modal' | 'primarySidebar' | 'secondaryPopover',
    'componentId'
  >,
  'params'
> & {
  params: Promise<DashboardLayoutProps['params']>
}

const Layout = async (props: LayoutProps) => {
  const params = await props.params;

  const {
    children,
    configPane,
    header,
    modal,
    primarySidebar,
    secondaryPopover
  } = props;

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
