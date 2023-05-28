import React, { useState } from 'react'
import tw from 'twin.macro'
import type { SidebarToolbarProps } from '../SidebarToolbar'
import { CuiCollapsePanelContent } from './CuiCollapsePanelContent'
import { CuiCollapsePanelHeader } from './CuiCollapsePanelHeader'

interface CuiCollapsePanelProps {
  content: React.ReactNode
  key: string
  label: string
  toolbar?: SidebarToolbarProps
}

interface CuiCollapseProps {
  panels: Array<CuiCollapsePanelProps>
}

export const CuiCollapse = ({ panels }: CuiCollapseProps) => {
  const [activePanels, setActivePanels] = useState<Record<string, boolean>>({})

  const updateActivePanel = (key: string, expanded: boolean) => {
    setActivePanels({
      ...activePanels,
      [key]: expanded,
    })
  }

  return (
    <div
      css={tw`w-full h-full overflow-y-auto overflow-x-hidden flex flex-col`}
    >
      <div css={tw`w-full h-full flex flex-col py-1`}>
        {panels.map((view) => (
          <>
            <CuiCollapsePanelHeader
              label={view.label}
              onExpand={(expanded) => updateActivePanel(view.key, expanded)}
              toolbar={view.toolbar}
            />
            {activePanels[view.key] && (
              <CuiCollapsePanelContent content={view.content} key={view.key} />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
