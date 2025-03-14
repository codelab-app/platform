import type { Metadata } from 'next'

import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'

import { UpdateAppModalContainer } from './page.client'

export const metadata: Metadata = {
  title: 'Update App | Codelab',
}

const Page = async (props: { params: Promise<{ appId: string }> }) => {
  const params = await props.params
  const { appId } = params

  return <UpdateAppModalContainer id={appId} />
}

export default Page
