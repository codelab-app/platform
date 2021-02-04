import React from 'react'
import { sectionStyle } from '../../styles/sectionStyle'
import { PaneMainPage } from './Pane-main--page'
import { PaneMainTree } from './Pane-main--tree'

export const PaneMain = () => {
  return (
    <div style={sectionStyle}>
      <PaneMainPage />
      <PaneMainTree />
    </div>
  )
}
