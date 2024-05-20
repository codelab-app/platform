import 'server-only'
import { getUser } from '@codelab/frontend/application/shared/auth'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Apps | Codelab',
}

const AppsPage = async () => {
  const user = await getUser()

  if (!user) {
    return null
  }

  return <>{user.name}</>
}

export default AppsPage
