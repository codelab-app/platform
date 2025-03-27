import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { UpdateAuthGuardPopoverContainer } from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Update Auth Guard | Codelab',
}

const Page = async (props: PageProps<'authGuardId'>) => {
  const {
    params: { authGuardId },
  } = await parsePageProps(props)

  return <UpdateAuthGuardPopoverContainer id={authGuardId} />
}

export default Page
