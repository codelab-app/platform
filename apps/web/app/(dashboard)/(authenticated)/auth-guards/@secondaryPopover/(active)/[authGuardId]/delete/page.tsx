import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { DeleteAuthGuardModalContainer } from '@codelab/frontend-application-auth-guard/use-cases/delete-auth-guard'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Delete Auth Guard | Codelab',
}

const Page = async (props: PageProps<'authGuardId'>) => {
  const {
    params: { authGuardId },
  } = await parsePageProps(props)

  return <DeleteAuthGuardModalContainer id={authGuardId} />
}

export default Page
