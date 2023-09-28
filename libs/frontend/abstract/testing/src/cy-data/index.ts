const wrapCyData = (data: string) => `[data-cy="${data}"]`

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

export const CY_DATA_SELECTOR = {
  /**
   * header-toolbar
   */
  cuiHeader: () => wrapCyData(CY_DATA.cuiHeader()),

  /**
   * navigation-bar
   */
  cuiNavigationBarItem: (title: string) =>
    wrapCyData(CY_DATA.cuiNavigationBarItem(title)),

  /**
   * popover
   */
  cuiPopover: (title: string) => wrapCyData(CY_DATA.cuiPopover(title)),

  /**
   * sidebar
   */
  cuiSidebar: (label: string) => wrapCyData(CY_DATA.cuiSidebar(label)),

  cuiSidebarHeader: () => wrapCyData(CY_DATA.cuiSidebarHeader()),

  cuiSidebarViewContent: (label: string) =>
    wrapCyData(CY_DATA.cuiSidebarViewContent(label)),

  cuiSidebarViewHeader: (label: string) =>
    wrapCyData(CY_DATA.cuiSidebarViewHeader(label)),

  /**
   * skeleton
   */
  cuiSkeleton: () => wrapCyData(CY_DATA.cuiSkeleton()),

  /**
   * toolbar
   */
  cuiToolbarItem: (title: string) => wrapCyData(CY_DATA.cuiToolbarItem(title)),

  /**
   * tree
   */
  cuiTreeItem: () => wrapCyData(CY_DATA.cuiTreeItem()),

  cuiTreeItemPrimaryTitle: (primaryTitle: string) =>
    wrapCyData(CY_DATA.cuiTreeItemPrimaryTitle(primaryTitle)),

  cuiTreeItemSecondaryTitle: (secondaryTitle: string) =>
    wrapCyData(CY_DATA.cuiTreeItemSecondaryTitle(secondaryTitle)),

  cuiTreeItemToolbar: () => wrapCyData(CY_DATA.cuiTreeItemToolbar()),
}
