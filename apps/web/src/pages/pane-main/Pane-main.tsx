import React from 'react'
import { PaneMainStyle } from '@codelab/modules/style'
import { PaneMainPage } from '@codelab/modules/page'
import { LayoutTab } from '@codelab/frontend/layout'
import { PaneMainComponent } from '@codelab/modules/component'
import { PaneMainLambda } from '@codelab/modules/lambda'
import { BuilderPaneController } from '../Builder-pane-controller'
import { PaneMainTree } from './Pane-main--tree'

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
      <BuilderPaneController isVisible={({ tab }) => tab === LayoutTab.Styles}>
        <PaneMainStyle />
      </BuilderPaneController>
      <BuilderPaneController
        isVisible={({ tab }) => tab === LayoutTab.Function}
      >
        <PaneMainLambda />
      </BuilderPaneController>
    </div>
  )
}
