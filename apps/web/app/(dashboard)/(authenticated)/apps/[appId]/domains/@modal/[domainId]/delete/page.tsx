import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { DeleteDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/delete-domain'

export const metadata: Metadata = {
  title: 'Delete Domain | Codelab',
}

const Page = async ({ params }: PageProps<'domainId'>) => {
  const { domainId } = await params

  return <DeleteDomainModalContainer id={domainId} />
}

export default Page
