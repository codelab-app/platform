import type { Metadata } from 'next'

import { UpdateResourcePopoverContainer } from '@codelab/frontend-application-resource/use-cases/update-resource'

export const metadata: Metadata = {
  title: 'Update Resource | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <UpdateResourcePopoverContainer id={id} />
}

export default Page
