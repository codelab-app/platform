import type { UiKey } from '@codelab/frontend/abstract/types'

export const Cui = {
  cuiForm: (key: UiKey) => `cui-form-${key}`,
  cuiHeader: () => 'cui-header',
  cuiNavigationBarItem: (title: string) => `cui-navigation-bar-item-${title}`,
  cuiPopover: (key: UiKey) => `cui-sidebar-popover-${key}`,
  cuiModal: (key: UiKey) => `cui-modal-${key}`,
  cuiSidebar: (key: UiKey) => `cui-${key}`,
  cuiSidebarHeader: () => 'cui-sidebar-header',
  cuiSidebarViewContent: (label: string) => `cui-sidebar-view-content-${label}`,
  cuiSidebarViewHeader: (label: string) => `cui-sidebar-view-header-${label}`,
  cuiSkeleton: () => 'cui-skeleton',
  cuiToolbarItem: (key: UiKey) => `cui-toolbar-item-${key}`,
  cuiTreeItem: () => 'cui-tree-item',
  cuiTreeItemPrimaryTitle: (primaryTitle: string) =>
    `cui-tree-item-primary-title-${primaryTitle}`,
  cuiTreeItemSecondaryTitle: (secondaryTitle: string) =>
    `cui-tree-item-secondary-title-${secondaryTitle}`,
  cuiTreeItemToolbar: () => 'cui-tree-item-toolbar',
}
