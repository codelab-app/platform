import type { Metadata } from 'next'

import { UpdateDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/update-domain'

export const metadata: Metadata = {
  title: 'Update Domain | Codelab',
}

const Page = async ({ params }: { params: Promise<{ domainId: string }> }) => {
  const { domainId } = await params

  return <UpdateDomainModalContainer id={domainId} />
}

export default Page
