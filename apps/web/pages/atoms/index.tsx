import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { MainPaneAtom } from '@codelab/modules/atom'
import React from 'react'
import xw from 'xwind'
import { NextPageLayout } from '../../src/layout/Layout.d'
import { LayoutBuilder } from '../../src/layout/Layout--builder'

const Library: NextPageLayout<'builder'> = () => {
  return (
    <div id="Builder" css={xw`relative h-full`}>
      atoms
    </div>
  )
}

Library.Layout = LayoutBuilder
Library.MainPane = MainPaneAtom

export const getServerSideProps = withPageAuthRequired()

export default Library
