import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import { PageType } from '@codelab/frontend/model/state/router'
import {
  LibraryTemplate,
  MainPaneLibrary,
} from '@codelab/frontend/modules/library'
import { Breadcrumb } from 'antd'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

const LibraryContent = () => {
  // const { selectedComponent, setSelected } = useComponentBuilder()

  // if (!selectedComponent) {
  //   return null
  // }

  // const cy = CytoscapeService.fromComponent(selectedComponent)
  // const root = CytoscapeService.componentTree(cy)

  return (
    <>
      {/* {root.children?.length ? (*/}
      {/*  <ComponentRenderer component={selectedComponent} />*/}
      {/* ) : (*/}
      {/*  <Empty*/}
      {/*    description={*/}
      {/*      <span>Your component is empty, please add a component element</span>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <CreateComponentElementButton />*/}
      {/*  </Empty>*/}
      {/* )}*/}
      {/* <CreateComponentElementModal componentId={selectedComponent.id} /> */}
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
// Library.MetaPane = MetaPaneComponent

export const getServerSideProps = withPageAuthRequired()

export default Library
