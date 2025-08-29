'use client'

import type { UiKey } from '@codelab/frontend-abstract-types'

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
  uiKey: UiKey
}

const getLocalStorageKey = (uiKey: UiKey) => `${uiKey}-active-panels`

const getDefaultActivePanels = (items: Array<string>) =>
  items.reduce(
    (acc, panelKey) => ({
      ...acc,
      [panelKey]: true,
    }),
    {},
  )

const getStoredActivePanels = (uiKey: UiKey) => {
  const storedActivePanels = localStorage.getItem(getLocalStorageKey(uiKey))

  return storedActivePanels ? JSON.parse(storedActivePanels) : undefined
}

const storeActivePanels = (
  uiKey: UiKey,
  activePanels: Record<string, boolean>,
) => {
  localStorage.setItem(getLocalStorageKey(uiKey), JSON.stringify(activePanels))
}

export const CuiCollapsePanel = ({
  defaultActivePanels,
  items,
  uiKey,
}: CuiCollapsePanelProps) => {
  const [activePanels, setActivePanels] = useState<Record<string, boolean>>(
    getStoredActivePanels(uiKey) ||
      getDefaultActivePanels(defaultActivePanels ?? []),
  )

  const updateActivePanel = (key: string, expanded: boolean) => {
    const active = {
      ...activePanels,
      [key]: expanded,
    }

    setActivePanels(active)
    storeActivePanels(uiKey, active)
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
