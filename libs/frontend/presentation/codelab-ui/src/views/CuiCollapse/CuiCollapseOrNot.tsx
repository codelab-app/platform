import React from 'react'
import { CuiCollapse, type CuiCollapsePanelProps } from './CuiCollapse'
import { CuiCollapsePanelContent } from './CuiCollapsePanelContent'

interface CuiCollapseOrNotProps {
  defaultActivePanels?: Array<string>
  panels: Array<CuiCollapsePanelProps>
}

export const CuiCollapseOrNot = ({
  defaultActivePanels,
  panels,
}: CuiCollapseOrNotProps) => {
  return panels.length > 1 ? (
    <CuiCollapse defaultActivePanels={defaultActivePanels} panels={panels} />
  ) : panels[0] ? (
    <CuiCollapsePanelContent
      content={panels[0].content}
      isLoading={panels[0].isLoading}
      label={panels[0].label}
    />
  ) : null
}
