import type { Metadata } from 'next'

import { UpdateTagPopoverContainer } from '@codelab/frontend-application-tag/use-cases/update-tag'

export const metadata: Metadata = {
  title: 'Update Tag | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <UpdateTagPopoverContainer id={id} />
}

export default Page
