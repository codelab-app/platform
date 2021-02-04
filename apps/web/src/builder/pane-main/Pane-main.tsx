import React from 'react'
import { useBuilderLayout } from '../Builder-pane--state'
import { PaneMainComponent } from './Pane-main--component'
import { PaneMainPage } from './Pane-main--page'
import { PaneMainTree } from './Pane-main--tree'

export const PaneMain = () => {
  const layout = useBuilderLayout()

  return (
    <div>
      {layout.tab === 'component' ? <PaneMainComponent /> : null}
      {layout.tab === 'page' ? <PaneMainPage /> : null}
      {layout.tab === 'tree' ? <PaneMainTree /> : null}
    </div>
  )
}
