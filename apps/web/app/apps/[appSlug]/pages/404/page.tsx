import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import type { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Page Not Found',
}

const Error404Page = () => {
  return <h1>404 - Page not found</h1>
}

export default Error404Page

Error404Page.displayName = 'Page404'
