import type { Metadata } from 'next'

import { DeleteDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/delete-domain'

export const metadata: Metadata = {
  title: 'Delete Domain | Codelab',
}

const Page = async ({ params }: { params: Promise<{ domainId: string }> }) => {
  const resolvedParams = await params
  const { domainId } = resolvedParams

  return <DeleteDomainModalContainer id={domainId} />
}

export default Page
