import type { Metadata } from 'next'

import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'

export const metadata: Metadata = {
  title: 'Create App | Codelab',
}

const Page = async () => {
  return <CreateAppModal />
}

export default Page
