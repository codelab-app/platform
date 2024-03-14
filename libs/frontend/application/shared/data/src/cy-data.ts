import type {
  ModelActionKey,
  ModelUiKey,
} from '@codelab/frontend/abstract/types'

export const wrapCyData = (data: string) => `[data-cy="${data}"]`

export const CY_DATA = {
  /**
   * from
   */
  cuiForm: (key: ModelActionKey) => `cui-form-${key}`,

  /**
   * header-toolbar
   */
  cuiHeader: () => 'cui-header',

  /**
   * navigation-bar
   */
  cuiNavigationBarItem: (title: string) => `cui-navigation-bar-item-${title}`,

  /**
   * popover
   */
  cuiPopover: (key: ModelActionKey) => `cui-sidebar-popover-${key}`,

  /**
   * sidebar
   */
  cuiSidebar: (key: ModelUiKey) => `cui-${key}`,

  cuiSidebarHeader: () => 'cui-sidebar-header',

  cuiSidebarViewContent: (label: string) => `cui-sidebar-view-content-${label}`,

  cuiSidebarViewHeader: (label: string) => `cui-sidebar-view-header-${label}`,

  /**
   * skeleton
   */
  cuiSkeleton: () => 'cui-skeleton',

  /**
   * toolbar
   */
  cuiToolbarItem: (key: ModelActionKey) => `cui-toolbar-item-${key}`,

  /**
   * tree
   */
  cuiTreeItem: () => 'cui-tree-item',

  cuiTreeItemPrimaryTitle: (primaryTitle: string) =>
    `cui-tree-item-primary-title-${primaryTitle}`,

  cuiTreeItemSecondaryTitle: (secondaryTitle: string) =>
    `cui-tree-item-secondary-title-${secondaryTitle}`,

  cuiTreeItemToolbar: () => 'cui-tree-item-toolbar',
}
