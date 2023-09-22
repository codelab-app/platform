/* eslint-disable @typescript-eslint/member-ordering */
import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/testing/cypress/command'
import { getCuiHeaderToolbar } from './header-toolbar/header-toolbar.command'
import { getCuiNavigationBarItem } from './navigation-bar/navigation-bar.command'
import { getCuiPopover } from './popover/popover.command'
import {
  getCuiSidebar,
  getCuiSidebarToolbarItem,
  getCuiSidebarViewContent,
  getCuiSidebarViewHeader,
} from './sidebar/sidebar.command'
import { getCuiSkeleton } from './skeleton/skeleton.command'
import { getCuiToolbarItem } from './toolbar/toolbar.command'
import {
  getCuiTreeItem,
  getCuiTreeItemByPrimaryTitle,
  getCuiTreeItemBySecondaryTitle,
  getCuiTreeItemToolbar,
} from './tree/tree.command'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Chainable<Subject> extends CypressCodelabUICommands {}
  }
}

export interface CypressCodelabUICommands {
  /**
   * header-toolbar
   */
  getCuiHeaderToolbar: typeof getCuiHeaderToolbar
  /**
   * navigation-bar
   */
  getCuiNavigationBarItem: typeof getCuiNavigationBarItem
  /**
   * sidebar
   */
  getCuiSidebar: typeof getCuiSidebar
  getCuiSidebarToolbarItem: typeof getCuiSidebarToolbarItem
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
  getCuiTreeItemByPrimaryTitle: typeof getCuiTreeItemByPrimaryTitle
  getCuiTreeItemBySecondaryTitle: typeof getCuiTreeItemBySecondaryTitle
  getCuiTreeItemToolbar: typeof getCuiTreeItemToolbar
  /**
   * popover
   */
  getCuiPopover: typeof getCuiPopover
}

export const codelabUICommands: Array<CypressCommand> = [
  /**
   * header-toolbar
   */
  {
    fn: getCuiHeaderToolbar,
    name: 'getCuiHeaderToolbar',
  },
  /**
   * navigation-bar
   */
  {
    fn: getCuiNavigationBarItem,
    name: 'getCuiNavigationBarItem',
  },
  /**
   * sidebar
   */
  {
    fn: getCuiSidebar,
    name: 'getCuiSidebar',
  },
  {
    fn: getCuiSidebarViewContent,
    name: 'getCuiSidebarViewContent',
  },
  {
    fn: getCuiSidebarViewHeader,
    name: 'getCuiSidebarViewHeader',
  },
  {
    fn: getCuiSidebarToolbarItem,
    name: 'getCuiSidebarToolbarItem',
  },
  /**
   * skeleton
   */
  {
    fn: getCuiSkeleton,
    name: 'getCuiSkeleton',
  },
  /**
   * toolbar
   */
  {
    fn: getCuiToolbarItem,
    name: 'getCuiToolbarItem',
    options: {
      prevSubject: 'optional',
    },
  },
  /**
   * tree
   */
  {
    fn: getCuiTreeItem,
    name: 'getCuiTreeItem',
  },
  {
    fn: getCuiTreeItemByPrimaryTitle,
    name: 'getCuiTreeItemByPrimaryTitle',
  },
  {
    fn: getCuiTreeItemBySecondaryTitle,
    name: 'getCuiTreeItemBySecondaryTitle',
  },
  {
    fn: getCuiTreeItemToolbar,
    name: 'getCuiTreeItemToolbar',
  },
  /**
   * Popover
   */
  {
    fn: getCuiPopover,
    name: 'getCuiPopover',
  },
]
