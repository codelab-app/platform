import type { Metadata } from 'next'

import { DeleteTagsModalContainer } from '@codelab/frontend-application-tag/use-cases/delete-tags'

export const metadata: Metadata = {
  title: 'Delete Tags | Codelab',
}

const Page = async ({
  params,
}: {
  params: Promise<{ ids: Array<string> }>
}) => {
  const { ids } = await params

  return <DeleteTagsModalContainer ids={ids} />
}

export default Page
