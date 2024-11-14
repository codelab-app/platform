'use client'

import { Fragment, useState } from 'react'

import type { CuiSidebarToolbarProps } from '../CuiSidebarToolbar'

import { CuiCollapsePanelContent } from './CuiCollapsePanelContent'
import { CuiCollapsePanelHeader } from './CuiCollapsePanelHeader'

export interface CuiCollapsePanelItemsProps {
  content: React.ReactNode
  isLoading?: boolean
  key: string
  label: string
  toolbar?: CuiSidebarToolbarProps
}

interface CuiCollapsePanelProps {
  defaultActivePanels?: Array<string>
  items: Array<CuiCollapsePanelItemsProps>
}

export const CuiCollapsePanel = ({
  defaultActivePanels,
  items,
}: CuiCollapsePanelProps) => {
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
    <div className="flex size-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex size-full flex-col py-1">
        {items.map((view) => {
          return (
            <Fragment key={view.key}>
              <CuiCollapsePanelHeader
                defaultExpand={activePanels[view.key]}
                label={view.label}
                onExpand={(expanded) => {
                  updateActivePanel(view.key, expanded)
                }}
                toolbar={view.toolbar}
              />
              {activePanels[view.key] && (
                <CuiCollapsePanelContent
                  content={view.content}
                  isLoading={view.isLoading}
                  label={view.label}
                />
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
