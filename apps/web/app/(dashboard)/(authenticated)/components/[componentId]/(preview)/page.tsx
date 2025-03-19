import type { Metadata } from 'next'

import { ComponentPreviewBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const Page = async ({
  params,
}: {
  params: Promise<{
    componentId: string
  }>
}) => {
  const { componentId } = await params

  return <ComponentPreviewBuilderContainer componentId={componentId} />
}

export default Page
