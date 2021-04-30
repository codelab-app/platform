import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { PaneMainLibrary } from '@codelab/modules/library'
import { NextPageLayout } from '../../src/layout/Layout.d'
import { LayoutComponent } from 'apps/web/src/layout/Layout--component'

const Library: NextPageLayout<'builder'> = () => {
  return (
    <div id="Builder" style={{ position: 'relative' }}>
      Components
    </div>
  )
}

Library.Layout = LayoutComponent
Library.MainPane = PaneMainLibrary

export const getServerSideProps = withPageAuthRequired()

export default Library
