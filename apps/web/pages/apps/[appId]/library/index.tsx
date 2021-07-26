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
import { MetaPaneComponent } from 'apps/web/src/templates/library/MetaPaneComponent'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { NextPageTemplate } from '../../../../src/templates/Layout.d'
import { LibraryTemplate } from '../../../../src/templates/library/LibraryTemplate'

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

const Library: NextPageTemplate<'builder'> = () => {
  return (
    <div id="Builder" css={tw`relative h-full`}>
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

Library.Template = LibraryTemplate
Library.MainPane = MainPaneLibrary
Library.MetaPane = MetaPaneComponent

export const getServerSideProps = withPageAuthRequired()

export default Library
