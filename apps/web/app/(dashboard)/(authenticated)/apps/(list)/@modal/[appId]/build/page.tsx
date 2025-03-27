import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { BuildAppModalContainer } from '@codelab/frontend-application-app/use-cases/build-app'

export const metadata: Metadata = {
  title: 'Build App | Codelab',
}

const Page = async ({ params }: PageProps<'appId'>) => {
  const { appId } = await params

  return <BuildAppModalContainer id={appId} />
}

export default Page
