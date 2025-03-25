import type {
  LayoutProps,
  PageProps,
} from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { UpdateResourcePopoverContainer } from '@codelab/frontend-application-resource/use-cases/update-resource'

export const metadata: Metadata = {
  title: 'Update Resource | Codelab',
}

const Page = async ({ params }: PageProps<'resourceId'>) => {
  const { resourceId } = await params

  return <UpdateResourcePopoverContainer id={resourceId} />
}

export default Page
