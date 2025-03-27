import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { ComponentPreviewBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const Page = async (props: PageProps<'componentId'>) => {
  const {
    params: { componentId },
  } = await parsePageProps(props)

  return <ComponentPreviewBuilderContainer componentId={componentId} />
}

export default Page
