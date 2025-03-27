import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { BuildAppModalContainer } from '@codelab/frontend-application-app/use-cases/build-app'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Build App | Codelab',
}

const Page = async (props: PageProps<'appId'>) => {
  const {
    params: { appId },
  } = await parsePageProps(props)

  return <BuildAppModalContainer id={appId} />
}

export default Page
