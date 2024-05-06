import 'server-only'
import { AntdRegistry } from '@ant-design/nextjs-registry'
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

  return <AntdRegistry>{user.name}</AntdRegistry>
}

export default AppsPage
