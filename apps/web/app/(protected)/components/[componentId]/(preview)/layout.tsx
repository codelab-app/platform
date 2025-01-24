import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

type LayoutProps = DashboardLayoutProps<'header', 'componentId'>

const ComponentPreviewLayout = ({ children, header, params }: LayoutProps) => {
  const { componentId } = params

  return (
    <DashboardLayout<'header', 'componentId'> header={header} params={params}>
      <LayoutClient componentId={componentId}>{children}</LayoutClient>
    </DashboardLayout>
  )
}

export default ComponentPreviewLayout
