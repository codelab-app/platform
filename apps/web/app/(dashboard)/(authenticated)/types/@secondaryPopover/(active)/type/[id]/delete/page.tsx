import type { Metadata } from 'next'

import { DeleteTypeModalContainer } from '@codelab/frontend-application-type/use-cases/delete-type'

export const metadata: Metadata = {
  title: 'Delete Type | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteTypeModalContainer id={id} />
}

export default Page
