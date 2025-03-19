import type { Metadata } from 'next'

import { UpdateAppModalContainer } from '@codelab/frontend-application-app/use-cases/update-app'

export const metadata: Metadata = {
  title: 'Update App | Codelab',
}

const Page = async ({ params }: { params: Promise<{ appId: string }> }) => {
  const resolvedParams = await params
  const { appId } = resolvedParams

  return <UpdateAppModalContainer id={appId} />
}

export default Page
