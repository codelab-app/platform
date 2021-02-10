import React from 'react'
import { BuilderPaneController } from '../Builder-pane-controller'
import { PaneMainComponent } from './component/Pane-main--component'
import { PaneMainPage } from './page/Pane-main--page'
import { PaneMainTree } from './tree/Pane-main--tree'
import { LayoutTab } from '@codelab/generated'

export const PaneMain = () => {
  return (
    <div>
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
    </div>
  )
}
