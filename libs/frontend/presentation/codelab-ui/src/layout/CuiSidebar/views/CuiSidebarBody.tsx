import type { CuiSidebarProps } from '../CuiSidebar'

import { CuiCollapsePanel, CuiCollapsePanelContent } from '../../../views'

export const CuiSidebarBody = ({
  defaultActiveViewKeys,
  uiKey,
  views,
}: Pick<CuiSidebarProps, 'defaultActiveViewKeys' | 'uiKey' | 'views'>) => {
  if (views.length > 1) {
    return (
      <CuiCollapsePanel
        defaultActivePanels={defaultActiveViewKeys}
        items={views}
        uiKey={uiKey}
      />
    )
  }

  // Single item we don't show the collapse header
  if (views[0]) {
    return (
      <CuiCollapsePanelContent
        content={views[0].content}
        isLoading={views[0].isLoading}
        label={views[0].label}
      />
    )
  }

  return null
}
