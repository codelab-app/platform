import type { LayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { DeleteResourceModalContainer } from '@codelab/frontend-application-resource/use-cases/delete-resource'

export const metadata: Metadata = {
  title: 'Delete Resource | Codelab',
}

const Page = async ({ params }: LayoutProps<'resourceId'>) => {
  const { resourceId } = await params

  return <DeleteResourceModalContainer id={resourceId} />
}

export default Page
