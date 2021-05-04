import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { PageType } from '@codelab/frontend/shared'
import { ComponentRenderer } from '@codelab/modules/component'
import {
  CreateComponentElementButton,
  CreateComponentElementModal,
} from '@codelab/modules/component-element'
import { MainPaneLibrary } from '@codelab/modules/library'
import { Breadcrumb, Empty } from 'antd'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import { MetaPaneComponent } from 'apps/web/src/layout/MetaPaneComponent'
import Link from 'next/link'
import React from 'react'
import xw from 'xwind'
import { NextPageLayout } from '../../src/layout/Layout.d'

const LibraryContent = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()

  if (!selectedComponent) {
    return null
  }

  const cy = CytoscapeService.fromComponent(selectedComponent)
  const root = CytoscapeService.componentTree(cy)

  return (
    <>
      {root.children?.length ? (
        <ComponentRenderer component={selectedComponent} />
      ) : (
        <Empty
          description={
            <span>Your component is empty, please add a component element</span>
          }
        >
          <CreateComponentElementButton />
        </Empty>
      )}
      <CreateComponentElementModal componentId={selectedComponent.id} />
    </>
  )
}

const Library: NextPageLayout<'builder'> = () => {
  return (
    <div id="Builder" css={xw`relative h-full`}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href={{ pathname: PageType.AppList }}>Apps</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={{ pathname: PageType.LibraryList }}>Libraries</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <LibraryContent />
    </div>
  )
}

Library.Layout = LayoutBuilder
Library.MainPane = MainPaneLibrary
Library.MetaPane = MetaPaneComponent

export const getServerSideProps = withPageAuthRequired()

export default Library
