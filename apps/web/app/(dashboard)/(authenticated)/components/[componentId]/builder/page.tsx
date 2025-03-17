import type { Metadata } from 'next'

import { ComponentBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'

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

  return <ComponentBuilderContainer componentId={componentId} />
}

export default ComponentBuilderPage
