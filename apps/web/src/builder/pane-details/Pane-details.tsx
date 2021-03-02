import React from 'react'
import { LayoutTab } from '../../layout/layout-state'
import { PageContainerCreate } from '../../useCases/pages/Page-container--create'
import { PageContainerUpdateDelete } from '../../useCases/pages/Page-container--updateDelete'
import { usePage } from '../../useCases/pages/usePage'
import { BuilderPaneController } from '../Builder-pane-controller'

export const BuilderDetails = () => {
  const { detailPageId } = usePage()

  return (
    <>
      <BuilderPaneController isVisible={({ tab }) => tab === LayoutTab.Page}>
        {detailPageId ? <PageContainerUpdateDelete /> : <PageContainerCreate />}
      </BuilderPaneController>
      <BuilderPaneController
        isVisible={({ tab }) => tab === LayoutTab.Function}
      >
        <h1>Function</h1>
      </BuilderPaneController>
    </>
  )
}
