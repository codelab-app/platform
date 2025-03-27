import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { UpdateDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Update Domain | Codelab',
}

const Page = async (props: PageProps<'domainId'>) => {
  const {
    params: { domainId },
  } = await parsePageProps(props)

  return <UpdateDomainModalContainer id={domainId} />
}

export default Page
