import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'

export const metadata: Metadata = {
  title: 'Create Domain | Codelab',
}

const Page = async ({ params }: PageProps<'appId'>) => {
  const { appId } = await params

  return <CreateDomainModal appId={appId} />
}

export default Page
