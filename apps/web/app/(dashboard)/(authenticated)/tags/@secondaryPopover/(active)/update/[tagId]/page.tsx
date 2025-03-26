import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { UpdateTagPopoverContainer } from '@codelab/frontend-application-tag/use-cases/update-tag'

export const metadata: Metadata = {
  title: 'Update Tag | Codelab',
}

const Page = async ({ params }: PageProps<'tagId'>) => {
  const { tagId } = await params

  return <UpdateTagPopoverContainer id={tagId} />
}

export default Page
