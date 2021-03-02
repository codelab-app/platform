import React from 'react'
import { LayoutTab } from '../../../templates/layout-state'
import { PaneMainComponent } from '../../../useCases/component/paneMain/Pane-main--component'
import { PaneMainLambda } from '../../../useCases/lambda/paneMain/Pane-main--lambda'
import { PaneMainPage } from '../../../useCases/pages/paneMain/Pane-main--page'
import { PaneMainTree } from '../../../useCases/tree/paneMain/Pane-main--tree'
import { BuilderPaneController } from '../Builder-pane-controller'

export const PaneMain = () => {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <BuilderPaneController
        isVisible={({ tab }) => tab === LayoutTab.Component}
      >
        <PaneMainComponent />
      </BuilderPaneController>
      <BuilderPaneController isVisible={({ tab }) => tab === LayoutTab.Page}>
        <PaneMainPage />
      </BuilderPaneController>
      <BuilderPaneController isVisible={({ tab }) => tab === LayoutTab.Tree}>
        <PaneMainTree />
      </BuilderPaneController>
      <BuilderPaneController
        isVisible={({ tab }) => tab === LayoutTab.Function}
      >
        <PaneMainLambda />
      </BuilderPaneController>
    </div>
  )
}
