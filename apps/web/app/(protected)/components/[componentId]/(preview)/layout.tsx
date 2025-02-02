import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutClient } from './layout.client'

type LayoutProps = Omit<
  DashboardLayoutProps<'header', 'componentId'>,
  'params'
> & {
  params: Promise<DashboardLayoutProps['params']>
}

const ComponentPreviewLayout = async (props: LayoutProps) => {
  const params = await props.params

  const { children, header } = props

  const { componentId } = params

  return (
    <DashboardLayout<'header', 'componentId'> header={header} params={params}>
      <LayoutClient componentId={componentId}>{children}</LayoutClient>
    </DashboardLayout>
  )
}

export default ComponentPreviewLayout
