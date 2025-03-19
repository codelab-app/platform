import type { Metadata } from 'next'

import { DeleteResourceModalContainer } from '@codelab/frontend-application-resource/use-cases/delete-resource'

export const metadata: Metadata = {
  title: 'Delete Resource | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteResourceModalContainer id={id} />
}

export default Page
