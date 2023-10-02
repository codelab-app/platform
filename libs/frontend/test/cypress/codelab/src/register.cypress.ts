import type { OmitFirstArg } from '@codelab/frontend/test/cypress/command'
import type { getCuiHeader } from './header-toolbar/header.command'
import type { getCuiNavigationBarItem } from './navigation-bar/navigation-bar.command'
import type { getCuiPopover } from './popover/popover.command'
import type {
  getCuiSidebar,
  getCuiSidebarHeader,
  getCuiSidebarViewContent,
  getCuiSidebarViewHeader,
} from './sidebar/sidebar.command'
import type { getCuiSkeleton } from './skeleton/skeleton.command'
import type { getCuiToolbarItem } from './toolbar/toolbar.command'
import type {
  getCuiTreeItem,
  getCuiTreeItemByPrimaryTitle,
  getCuiTreeItemBySecondaryTitle,
  getCuiTreeItemToolbar,
} from './tree/tree.command'

declare global {
  namespace Cypress {
    interface Chainable<Subject> extends CypressCodelabUICommands {}
  }
}

export interface CypressCodelabUICommands {
  /**
   * header-toolbar
   */
  getCuiHeader: typeof getCuiHeader
  /**
   * navigation-bar
   */
  getCuiNavigationBarItem: typeof getCuiNavigationBarItem
  /**
   * popover
   */
  getCuiPopover: typeof getCuiPopover
  /**
   * sidebar
   */
  getCuiSidebar: typeof getCuiSidebar
  getCuiSidebarHeader: OmitFirstArg<typeof getCuiSidebarHeader>
  getCuiSidebarViewContent: typeof getCuiSidebarViewContent
  getCuiSidebarViewHeader: typeof getCuiSidebarViewHeader
  /**
   * skeleton
   */
  getCuiSkeleton: typeof getCuiSkeleton
  /**
   * toolbar
   */
  getCuiToolbarItem: OmitFirstArg<typeof getCuiToolbarItem>
  /**
   * tree
   */
  getCuiTreeItem: typeof getCuiTreeItem
  getCuiTreeItemByPrimaryTitle: OmitFirstArg<
    typeof getCuiTreeItemByPrimaryTitle
  >
  getCuiTreeItemBySecondaryTitle: OmitFirstArg<
    typeof getCuiTreeItemBySecondaryTitle
  >
  getCuiTreeItemToolbar: OmitFirstArg<typeof getCuiTreeItemToolbar>
}
