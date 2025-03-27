import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { UpdateDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/update-domain'

export const metadata: Metadata = {
  title: 'Update Domain | Codelab',
}

const Page = async ({ params }: PageProps<'domainId'>) => {
  const { domainId } = await params

  return <UpdateDomainModalContainer id={domainId} />
}

export default Page
