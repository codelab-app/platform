import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import React from 'react'

const LibraryPage: CodelabPage = () => {
  return <div id="Builder" style={{ position: 'relative' }} />
}

export const getServerSideProps = withPageAuthRequired()

LibraryPage.Template = DashboardTemplate
LibraryPage.Header = null
LibraryPage.MetaPane = null
LibraryPage.MainPane = null
LibraryPage.SidebarNavigation = null

export default LibraryPage
