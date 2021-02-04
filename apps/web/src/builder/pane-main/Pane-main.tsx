import React from 'react'
import { useBuilderLayout } from '../Builder-pane--state'
import { PaneMainComponent } from './component/Pane-main--component'
import { PaneMainPage } from './page/Pane-main--page'
import { PaneMainTree } from './tree/Pane-main--tree'

export const PaneMain = () => {
  const layout = useBuilderLayout()

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      {/* <PaneMainComponentStyle visible={layout.tab === 'component'}> */}
      {/* </PaneMainComponentStyle> */}
      {layout.tab === 'component' ? <PaneMainComponent /> : null}
      {layout.tab === 'page' ? <PaneMainPage /> : null}
      {layout.tab === 'tree' ? <PaneMainTree /> : null}
    </div>
  )
}
