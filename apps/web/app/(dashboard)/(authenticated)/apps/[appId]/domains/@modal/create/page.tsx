import type { Metadata } from 'next'

import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'

export const metadata: Metadata = {
  title: 'Create Domain | Codelab',
}

const Page = async ({ params }: { params: Promise<{ appId: string }> }) => {
  const { appId } = await params

  return <CreateDomainModal appId={appId} />
}

export default Page
