import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { UpdateAuthGuardPopoverContainer } from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'

export const metadata: Metadata = {
  title: 'Update Auth Guard | Codelab',
}

const Page = async ({ params }: PageProps<'authGuardId'>) => {
  const { authGuardId } = await params

  return <UpdateAuthGuardPopoverContainer id={authGuardId} />
}

export default Page
