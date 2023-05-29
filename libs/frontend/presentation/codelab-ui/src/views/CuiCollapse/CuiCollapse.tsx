import React, { useState } from 'react'
import tw from 'twin.macro'
import type { SidebarToolbarProps } from '../SidebarToolbar'
import { CuiCollapsePanelContent } from './CuiCollapsePanelContent'
import { CuiCollapsePanelHeader } from './CuiCollapsePanelHeader'

interface CuiCollapsePanelProps {
  content: React.ReactNode
  isLoading?: boolean
  key: string
  label: string
  toolbar?: SidebarToolbarProps
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
    <div
      css={tw`w-full h-full overflow-y-auto overflow-x-hidden flex flex-col`}
    >
      <div css={tw`w-full h-full flex flex-col py-1`}>
        {panels.map((view) => (
          <>
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
                key={view.key}
              />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
