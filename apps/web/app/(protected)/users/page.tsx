import { UsersTable } from '@codelab/frontend-application-user/use-cases/user-list'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Users | Codelab',
}

const UsersRoute = () => {
  return <UsersTable />
}

export default UsersRoute
