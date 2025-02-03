import { getUiDataKey, type UiKey } from '@codelab/frontend/abstract/types'
import { kebabCase } from '@codelab/shared/utils'

/**
 * These are unique testid selector used for e2d testing
 */
export const CuiTestId = {
  cuiForm: (key: UiKey) => `cui-form-${getUiDataKey(key)}`,
  cuiHeader: () => 'cui-header',
  cuiModal: () => 'cui-modal',
  cuiNavigationBarItem: (title: string) => `cui-navigation-bar-item-${title}`,
  cuiPopover: () => 'cui-sidebar-popover',
  cuiSidebar: (key: UiKey) => `cui-sidebar-${getUiDataKey(key)}`,
  cuiSidebarHeader: () => 'cui-sidebar-header',
  cuiSidebarViewContent: (label: string) =>
    `cui-sidebar-view-content-${kebabCase(label)}`,
  cuiSidebarViewHeader: (label: string) =>
    `cui-sidebar-view-header-${kebabCase(label)}`,
  cuiSkeleton: () => 'cui-skeleton',
  cuiToolbar: () => 'cui-toolbar',
  cuiToolbarItem: (key: UiKey) => `cui-toolbar-item-${getUiDataKey(key)}`,
  cuiTree: () => 'cui-tree',
  cuiTreeItem: () => 'cui-tree-item',
  cuiTreeItemPrimaryTitle: (primaryTitle: string) =>
    `cui-tree-item-primary-title-${kebabCase(primaryTitle)}`,
  cuiTreeItemSecondaryTitle: (secondaryTitle: string) =>
    `cui-tree-item-secondary-title-${kebabCase(secondaryTitle)}`,
  cuiTreeItemToolbar: () => 'cui-tree-item-toolbar',
}
