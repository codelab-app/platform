import type { Metadata } from 'next'

import { BuildAppModalContainer } from '@codelab/frontend-application-app/use-cases/build-app'

export const metadata: Metadata = {
  title: 'Build App | Codelab',
}

const Page = async ({ params }: { params: Promise<{ appId: string }> }) => {
  const { appId } = await params

  return <BuildAppModalContainer id={appId} />
}

export default Page
