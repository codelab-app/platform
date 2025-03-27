import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { ComponentBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const Page = async ({ params }: PageProps<'componentId'>) => {
  const { componentId } = await params

  return <ComponentBuilderContainer componentId={componentId} />
}

export default Page
