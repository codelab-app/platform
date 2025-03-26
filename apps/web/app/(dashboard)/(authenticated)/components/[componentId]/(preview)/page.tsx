import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { ComponentPreviewBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const Page = async ({ params }: PageProps<'componentId'>) => {
  const { componentId } = await params

  return <ComponentPreviewBuilderContainer componentId={componentId} />
}

export default Page
