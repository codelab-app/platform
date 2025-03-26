import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { DeleteAuthGuardModalContainer } from '@codelab/frontend-application-auth-guard/use-cases/delete-auth-guard'

export const metadata: Metadata = {
  title: 'Delete Auth Guard | Codelab',
}

const Page = async ({ params }: PageProps<'authGuardId'>) => {
  const { authGuardId } = await params

  return <DeleteAuthGuardModalContainer id={authGuardId} />
}

export default Page
