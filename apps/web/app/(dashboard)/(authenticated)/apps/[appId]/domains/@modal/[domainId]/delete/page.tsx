import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { DeleteDomainModalContainer } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Delete Domain | Codelab',
}

const Page = async (props: PageProps<'domainId'>) => {
  const {
    params: { domainId },
  } = await parsePageProps(props)

  return <DeleteDomainModalContainer id={domainId} />
}

export default Page
