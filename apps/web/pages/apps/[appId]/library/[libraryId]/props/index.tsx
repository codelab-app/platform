import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import { DashboardLayout } from '@codelab/frontend/view/templates'
import React from 'react'

const LibraryPage: NextPageTemplate<'dashboard'> = () => {
  return <div id="Builder" style={{ position: 'relative' }} />
}

export const getServerSideProps = withPageAuthRequired()

LibraryPage.Template = DashboardLayout

export default LibraryPage
