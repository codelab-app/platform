import type { Metadata } from 'next'

import { DeleteAppModalContainer } from '@codelab/frontend-application-app/use-cases/delete-app'

export const metadata: Metadata = {
  title: 'Delete App | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteAppModalContainer id={id} />
}

export default Page
