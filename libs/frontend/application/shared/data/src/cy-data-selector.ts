import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA, wrapCyData } from './cy-data'

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
  cuiPopover: (key: ModelActionKey) => wrapCyData(CY_DATA.cuiPopover(key)),

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
  cuiToolbarItem: (key: ModelActionKey) =>
    wrapCyData(CY_DATA.cuiToolbarItem(key)),

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
