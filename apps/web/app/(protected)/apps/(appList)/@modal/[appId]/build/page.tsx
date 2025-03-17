import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { Metadata } from 'next'

import {
  BuildAppModal,
  BuildAppModalContainer,
} from '@codelab/frontend-application-app/use-cases/build-app'
import { AppConnector } from '@codelab/frontend-application-app/views'

export const metadata: Metadata = {
  title: 'Build App | Codelab',
}

const Page = async (props: { params: Promise<{ appId: string }> }) => {
  const params = await props.params
  const { appId } = params

  return <BuildAppModalContainer id={appId} />
}

export default Page
