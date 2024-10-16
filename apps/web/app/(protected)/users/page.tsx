import type { Metadata } from 'next'

import { UsersTable } from '@codelab/frontend-application-user/use-cases/user-list'

export const metadata: Metadata = {
  // description: '...',
  title: 'Users | Codelab',
}

const Page = () => {
  return <UsersTable />
}

export default Page
