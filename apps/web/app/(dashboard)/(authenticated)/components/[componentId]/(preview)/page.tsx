import type { Metadata } from 'next'

import { ComponentPreviewBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const Page = async (props: {
  params: Promise<{
    componentId: string
  }>
}) => {
  const params = await props.params
  const { componentId } = params

  return <ComponentPreviewBuilderContainer componentId={componentId} />
}

export default Page
