import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { CreateDomainModal } from '@codelab/frontend-application-domain/use-cases/create-domain'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Create Domain | Codelab',
}

const Page = async (props: PageProps<'appId'>) => {
  const {
    params: { appId },
  } = await parsePageProps(props)

  return <CreateDomainModal appId={appId} />
}

export default Page
