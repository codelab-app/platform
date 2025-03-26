import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { DeleteTagsModalContainer } from '@codelab/frontend-application-tag/use-cases/delete-tags'

export const metadata: Metadata = {
  title: 'Delete Tags | Codelab',
}

const Page = async ({ params }: PageProps<'tagIds'>) => {
  const { tagIds } = await params

  return <DeleteTagsModalContainer ids={tagIds} />
}

export default Page
