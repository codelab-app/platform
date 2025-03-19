import type { Metadata } from 'next'

import { UpdateAuthGuardPopoverContainer } from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'

export const metadata: Metadata = {
  title: 'Update Auth Guard | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <UpdateAuthGuardPopoverContainer id={id} />
}

export default Page
