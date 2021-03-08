import React from 'react'
import { LayoutTab } from '../../../templates/layout-state'
import { StyleContainerCreate } from '../../../useCases/styles/Style-container--create'
import { StyleContainerUpdateDelete } from '../../../useCases/styles/Style-container--updateDelete'
import { useStylesPane } from '../../../useCases/styles/useStylesPane'
import { BuilderPaneController } from '../Builder-pane-controller'
import { LambdaPaneDetail } from 'apps/web/src/useCases/lambda/paneDetail/Pane-detail--lambda'
import { PageDetailPane } from 'apps/web/src/useCases/pages/paneDetail/Pane-detail--page'

export const BuilderDetails = () => {
  const { detailStyleId } = useStylesPane()

  return (
    <>
      <BuilderPaneController isRendered={({ tab }) => tab === LayoutTab.Page}>
        <PageDetailPane />
      </BuilderPaneController>
      <BuilderPaneController isRendered={({ tab }) => tab === LayoutTab.Styles}>
        {detailStyleId ? (
          <StyleContainerUpdateDelete />
        ) : (
          <StyleContainerCreate />
        )}
      </BuilderPaneController>
      <BuilderPaneController
        isRendered={({ tab }) => tab === LayoutTab.Function}
      >
        <LambdaPaneDetail />
      </BuilderPaneController>
    </>
  )
}
