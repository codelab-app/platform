import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutContainer } from './layout.container'

type LayoutProps = DashboardLayoutProps<'header', 'componentId'>

const ComponentPreviewLayout = ({ children, header, params }: LayoutProps) => {
  const { componentId } = params

  return (
    <DashboardLayout<'header', 'componentId'> header={header} params={params}>
      <LayoutContainer componentId={componentId}>{children}</LayoutContainer>
    </DashboardLayout>
  )
}

export default ComponentPreviewLayout
