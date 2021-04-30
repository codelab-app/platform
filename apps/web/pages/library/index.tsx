import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { NextPageLayout } from '../_app'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import { PaneMainLibrary } from '@codelab/modules/library'

const Library: NextPageLayout<'builder'> = () => {
  return (
    <div id="Builder" style={{ position: 'relative' }}>
      Components
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

Library.Layout = LayoutBuilder
Library.MainPane = PaneMainLibrary

export default Library
