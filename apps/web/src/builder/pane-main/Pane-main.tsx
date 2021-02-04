import React from 'react'
import { sectionStyle } from '../../styles/sectionStyle'
import { useBuilderLayout } from '../Builder-pane--state'
import { PaneMainPage } from './Pane-main--page'
import { PaneMainTree } from './Pane-main--tree'

export const PaneMain = () => {
  const layout = useBuilderLayout()

  return (
    <div style={sectionStyle}>
      {layout.tab === 'component' ? <h1>Component</h1> : null}
      {layout.tab === 'page' ? <PaneMainPage /> : null}
      {layout.tab === 'tree' ? <PaneMainTree /> : null}
    </div>
  )
}
