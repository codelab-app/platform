import React, { useState } from 'react'
import type { CuiSidebarToolbarProps } from '../CuiSidebarToolbar'
import { CuiCollapsePanelContent } from './CuiCollapsePanelContent'
import { CuiCollapsePanelHeader } from './CuiCollapsePanelHeader'

export interface CuiCollapsePanelProps {
  content: React.ReactNode
  isLoading?: boolean
  key: string
  label: string
  toolbar?: CuiSidebarToolbarProps
}

interface CuiCollapseProps {
  defaultActivePanels?: Array<string>
  panels: Array<CuiCollapsePanelProps>
}

export const CuiCollapse = ({
  defaultActivePanels,
  panels,
}: CuiCollapseProps) => {
  const [activePanels, setActivePanels] = useState<Record<string, boolean>>(
    defaultActivePanels?.reduce(
      (acc, panelKey) => ({
        ...acc,
        [panelKey]: true,
      }),
      {},
    ) || {},
  )

  const updateActivePanel = (key: string, expanded: boolean) => {
    setActivePanels({
      ...activePanels,
      [key]: expanded,
    })
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex h-full w-full flex-col py-1">
        {panels.map((view) => (
          <React.Fragment key={view.key}>
            <CuiCollapsePanelHeader
              defaultExpand={activePanels[view.key]}
              label={view.label}
              onExpand={(expanded) => updateActivePanel(view.key, expanded)}
              toolbar={view.toolbar}
            />
            {activePanels[view.key] && (
              <CuiCollapsePanelContent
                content={view.content}
                isLoading={view.isLoading}
                label={view.label}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
