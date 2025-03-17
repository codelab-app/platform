import type { Metadata } from 'next'

import { UpdateAppModalContainer } from '@codelab/frontend-application-app/use-cases/update-app'

export const metadata: Metadata = {
  title: 'Update App | Codelab',
}

const Page = async (props: { params: Promise<{ appId: string }> }) => {
  const params = await props.params
  const { appId } = params

  return <UpdateAppModalContainer id={appId} />
}

export default Page
