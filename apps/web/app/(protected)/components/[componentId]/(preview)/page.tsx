import type { Metadata } from 'next'

import { ComponentPreviewBuilderConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const ComponentPreviewPage = async (props0: {
  params: Promise<{
    componentId: string
  }>
}) => {
  const params = await props0.params
  const { componentId } = params

  return <ComponentPreviewBuilderConnector componentId={componentId} />
}

export default ComponentPreviewPage
