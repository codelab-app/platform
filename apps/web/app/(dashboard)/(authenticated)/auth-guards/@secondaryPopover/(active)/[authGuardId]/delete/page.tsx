import type { Metadata } from 'next'

import { DeleteAuthGuardModalContainer } from '@codelab/frontend-application-auth-guard/use-cases/delete-auth-guard'

export const metadata: Metadata = {
  title: 'Delete Auth Guard | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteAuthGuardModalContainer id={id} />
}

export default Page
