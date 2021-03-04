import React from 'react'
import { LayoutTab } from '../../../templates/layout-state'
import { BuilderPaneController } from '../Builder-pane-controller'
import { LambdaPaneDetail } from 'apps/web/src/useCases/lambda/paneDetail/Pane-detail--lambda'
import { PageDetailPane } from 'apps/web/src/useCases/pages/paneDetail/Pane-detail--page'

export const BuilderDetails = () => {
  return (
    <>
      <BuilderPaneController isVisible={({ tab }) => tab === LayoutTab.Page}>
        <PageDetailPane />
      </BuilderPaneController>
      <BuilderPaneController
        isVisible={({ tab }) => tab === LayoutTab.Function}
      >
        <LambdaPaneDetail />
      </BuilderPaneController>
    </>
  )
}
