/* eslint-disable @typescript-eslint/member-ordering */
import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
import { getCuiForm } from './form/form.command'
import { getCuiHeader } from './header-toolbar/header.command'
import { getCuiNavigationBarItem } from './navigation-bar/navigation-bar.command'
import { getCuiPopover } from './popover/popover.command'
import {
  getCuiSidebar,
  getCuiSidebarHeader,
  getCuiSidebarViewContent,
  getCuiSidebarViewHeader,
} from './sidebar/sidebar.command'
import { getCuiSkeleton } from './skeleton/skeleton.command'
import { getCuiToolbarItem } from './toolbar/toolbar.command'
import {
  closestCuiTreeNode,
  getCuiTreeItem,
  getCuiTreeItemByPrimaryTitle,
  getCuiTreeItemBySecondaryTitle,
  getCuiTreeItemToolbar,
  toggleCuiTreeNodeCheckbox,
  toggleCuiTreeNodeSwitcher,
} from './tree/tree.command'

export interface CypressCuiCommands {
  /**
   * form
   */
  getCuiForm: typeof getCuiForm
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
  toggleCuiTreeNodeSwitcher: typeof toggleCuiTreeNodeSwitcher
  toggleCuiTreeNodeCheckbox: typeof toggleCuiTreeNodeCheckbox
  closestCuiTreeNode: OmitFirstArg<typeof closestCuiTreeNode>
  getCuiTreeItemByPrimaryTitle: OmitFirstArg<
    typeof getCuiTreeItemByPrimaryTitle
  >
  getCuiTreeItemBySecondaryTitle: OmitFirstArg<
    typeof getCuiTreeItemBySecondaryTitle
  >
  getCuiTreeItemToolbar: OmitFirstArg<typeof getCuiTreeItemToolbar>
}

export const codelabCommands: Array<CypressCommand> = [
  /**
   * form
   */
  {
    fn: getCuiForm,
  },
  /**
   * header
   */
  {
    fn: getCuiHeader,
  },
  /**
   * navigation-bar
   */
  {
    fn: getCuiNavigationBarItem,
  },
  /**
   * sidebar
   */
  {
    fn: getCuiSidebarHeader,
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getCuiSidebar,
  },
  {
    fn: getCuiSidebarViewContent,
  },
  {
    fn: getCuiSidebarViewHeader,
  },
  /**
   * skeleton
   */
  {
    fn: getCuiSkeleton,
  },
  /**
   * toolbar
   */
  {
    fn: getCuiToolbarItem,
    options: {
      prevSubject: 'optional',
    },
  },
  /**
   * tree
   */
  {
    fn: toggleCuiTreeNodeSwitcher,
  },
  { fn: toggleCuiTreeNodeCheckbox },
  {
    fn: getCuiTreeItem,
  },
  {
    fn: closestCuiTreeNode,
    options: {
      prevSubject: true,
    },
  },
  {
    fn: getCuiTreeItemByPrimaryTitle,
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getCuiTreeItemBySecondaryTitle,
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getCuiTreeItemToolbar,
    options: {
      prevSubject: true,
    },
  },
  /**
   * Popover
   */
  {
    fn: getCuiPopover,
  },
]
