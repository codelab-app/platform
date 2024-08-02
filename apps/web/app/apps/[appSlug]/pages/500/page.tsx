import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import type { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Internal Server Error<',
}

const Error500Page = () => {
  return <h1>500 - Internal Server Error</h1>
}

export default Error500Page

Error500Page.displayName = 'Page500'
