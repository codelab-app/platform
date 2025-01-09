import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import {
  Dashboard,
  DashboardLayout,
} from '@codelab/frontend-presentation-view/templates'

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
