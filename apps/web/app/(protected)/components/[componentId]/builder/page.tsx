import type { Metadata } from 'next'

import { ComponentBuilderConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const ComponentBuilderPage = async (props: {
  params: Promise<{
    componentId: string
  }>
}) => {
  const params = await props.params
  const { componentId } = params

  return <ComponentBuilderConnector componentId={componentId} />
}

export default ComponentBuilderPage
