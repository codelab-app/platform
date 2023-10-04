export const wrapCyData = (data: string) => `[data-cy="${data}"]`

export const CY_DATA = {
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
  cuiPopover: (title: string) => `cui-sidebar-popover-${title}`,

  /**
   * sidebar
   */
  cuiSidebar: (label: string) => `cui-sidebar-${label}`,

  cuiSidebarHeader: () => 'cui-sidebar-header',

  cuiSidebarViewContent: (label: string) => `cui-sidebar-view-content-${label}`,

  cuiSidebarViewHeader: (label: string) => `cui-sidebar-view-header-${label}`,

  /**
   * skeleton
   */
  cuiSkeleton: () => `cui-skeleton`,

  /**
   * toolbar
   */
  cuiToolbarItem: (title: string) => `cui-toolbar-item-${title}`,

  /**
   * tree
   */
  cuiTreeItem: () => `cui-tree-item`,

  cuiTreeItemPrimaryTitle: (primaryTitle: string) =>
    `cui-tree-item-primary-title-${primaryTitle}`,

  cuiTreeItemSecondaryTitle: (secondaryTitle: string) =>
    `cui-tree-item-secondary-title-${secondaryTitle}`,

  cuiTreeItemToolbar: () => `cui-tree-item-toolbar`,
}