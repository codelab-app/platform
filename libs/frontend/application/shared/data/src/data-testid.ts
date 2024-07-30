import type {
  ModelActionKey,
  ModelUiKey,
} from '@codelab/frontend/abstract/types'

export const DATA_TEST_ID = {
  /** header-toolbar */
  cuiHeader: 'cui-header',

  cuiSidebarHeader: 'cui-sidebar-header',

  /** skeleton */
  cuiSkeleton: 'cui-skeleton',

  /** tree */
  cuiTreeItem: 'cui-tree-item',

  cuiTreeItemToolbar: 'cui-tree-item-toolbar',

  /** form */
  cuiForm: (key: ModelActionKey) => `cui-form-${key}`,

  /** navigation-bar */
  cuiNavigationBarItem: (title: string) => `cui-navigation-bar-item-${title}`,
  /** popover */
  cuiPopover: (key: ModelActionKey) => `cui-sidebar-popover-${key}`,
  /** sidebar */
  cuiSidebar: (key: ModelUiKey) => `cui-${key}`,

  cuiSidebarViewContent: (label: string) => `cui-sidebar-view-content-${label}`,
  /**
   * VSCode uses views to refer to the accordions
   */
  cuiSidebarViewHeader: (label: string) => `cui-sidebar-view-header-${label}`,

  /** toolbar */
  cuiToolbarItem: (key: ModelActionKey) => `cui-toolbar-item-${key}`,

  cuiTreeItemPrimaryTitle: (primaryTitle: string) =>
    `cui-tree-item-primary-title-${primaryTitle}`,

  cuiTreeItemSecondaryTitle: (secondaryTitle: string) =>
    `cui-tree-item-secondary-title-${secondaryTitle}`,
}
