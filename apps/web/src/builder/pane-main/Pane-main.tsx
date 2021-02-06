import React from 'react'
import { BuilderPaneController } from '../Builder-pane-controller'
import { PaneMainComponent } from './component/Pane-main--component'
import { PaneMainPage } from './page/Pane-main--page'
import { PaneMainTree } from './tree/Pane-main--tree'
import {
  LayoutPaneVisibility,
  LayoutTab,
  useGetLayoutQuery,
} from '@codelab/generated'

export const PaneMain = () => {
  const { data } = useGetLayoutQuery()

  if (!data) {
    return null
  }

  const layout = data.getLayout

  return (
    <div
      // TODO: overflowY: 'scroll' stops draggable from being dragged outside of container
      style={{
        height: '100%',
        // overflowY: 'scroll',
        // overflowX: 'visible'
      }}
    >
      <BuilderPaneController
        layout={layout}
        isVisible={({ paneVisibility }) =>
          paneVisibility === LayoutPaneVisibility.Main ||
          paneVisibility === LayoutPaneVisibility.Both
        }
      >
        <PaneMainComponent />
      </BuilderPaneController>
      {layout.tab === LayoutTab.Page ? <PaneMainPage /> : null}
      {layout.tab === LayoutTab.Tree ? <PaneMainTree /> : null}
    </div>
  )
}
