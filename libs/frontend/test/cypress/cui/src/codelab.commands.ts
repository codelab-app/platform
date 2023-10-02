<<<<<<<< HEAD:libs/frontend/test/cypress/cui/src/codelab.commands.ts
import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
========
import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/command'
>>>>>>>> e4701781d (wip: update project tags):libs/frontend/test/cypress/codelab/src/codelab.commands.ts
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
  getCuiTreeItem,
  getCuiTreeItemByPrimaryTitle,
  getCuiTreeItemBySecondaryTitle,
  getCuiTreeItemToolbar,
} from './tree/tree.command'

export const codelabCommands: Array<CypressCommand> = [
  /**
   * header
   */
  {
    fn: getCuiHeader,
    name: 'getCuiHeader',
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
    fn: getCuiSidebarHeader,
    name: 'getCuiSidebarHeader',
    options: {
      prevSubject: 'optional',
    },
  },
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
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getCuiTreeItemBySecondaryTitle,
    name: 'getCuiTreeItemBySecondaryTitle',
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getCuiTreeItemToolbar,
    name: 'getCuiTreeItemToolbar',
    options: {
      prevSubject: true,
    },
  },
  /**
   * Popover
   */
  {
    fn: getCuiPopover,
    name: 'getCuiPopover',
  },
]
