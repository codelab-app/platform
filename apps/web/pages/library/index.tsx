import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { MainPaneLibrary } from '@codelab/modules/library'
import { NextPageLayout } from '../../src/layout/Layout.d'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import { MetaPaneComponent } from 'apps/web/src/layout/MetaPaneComponent'
import { ComponentRenderer } from '@codelab/modules/component'
import { useComponentBuilder } from '@codelab/frontend/builder'

const Library: NextPageLayout<'builder'> = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()

  if (!selectedComponent) {
    return null
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <ComponentRenderer component={selectedComponent} />
    </div>
  )
}

Library.Layout = LayoutBuilder
Library.MainPane = MainPaneLibrary
Library.MetaPane = MetaPaneComponent

export const getServerSideProps = withPageAuthRequired()

export default Library
