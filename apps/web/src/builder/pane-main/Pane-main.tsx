import React from 'react'
import { LayoutTab } from '../../layout/layout-state'
import { BuilderPaneController } from '../Builder-pane-controller'
import { PaneMainComponent } from './component/Pane-main--component'
import { PaneMainFunction } from './function/Pane-main--function'
import { PaneMainPage } from './page/Pane-main--page'
import { PaneMainTree } from './tree/Pane-main--tree'

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
        <PaneMainFunction />
      </BuilderPaneController>
    </div>
  )
}
