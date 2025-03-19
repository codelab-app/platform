import type { Metadata } from 'next'

import { DeleteComponentModalContainer } from '@codelab/frontend-application-component/use-cases/delete-component'

export const metadata: Metadata = {
  title: 'Delete Component | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteComponentModalContainer id={id} />
}

export default Page
