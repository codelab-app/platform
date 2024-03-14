import type {
  ModelActionKey,
  ModelUiKey,
} from '@codelab/frontend/abstract/types'

/**
 * Return this so we can't chain anymore get methods
 */
class CyDataAccessor {
  constructor(private data: string) {}

  get cyData() {
    return this.data
  }

  get cySelector() {
    return `[data-cy="${this.data}"]`
  }
}

class CyDataBuilder {
  /** form */
  cuiForm(key: ModelActionKey) {
    return new CyDataAccessor(`cui-form-${key}`)
  }

  /** header-toolbar */
  cuiHeader() {
    return new CyDataAccessor('cui-header')
  }

  /** navigation-bar */
  cuiNavigationBarItem(title: string) {
    return new CyDataAccessor(`cui-navigation-bar-item-${title}`)
  }

  /** popover */
  cuiPopover(key: ModelActionKey) {
    return new CyDataAccessor(`cui-sidebar-popover-${key}`)
  }

  /** sidebar */
  cuiSidebar(key: ModelUiKey) {
    return new CyDataAccessor(`cui-${key}`)
  }

  cuiSidebarHeader() {
    return new CyDataAccessor('cui-sidebar-header')
  }

  cuiSidebarViewContent(label: string) {
    return new CyDataAccessor(`cui-sidebar-view-content-${label}`)
  }

  cuiSidebarViewHeader(label: string) {
    return new CyDataAccessor(`cui-sidebar-view-header-${label}`)
  }

  /** skeleton */
  cuiSkeleton() {
    return new CyDataAccessor('cui-skeleton')
  }

  /** toolbar */
  cuiToolbarItem(key: ModelActionKey) {
    return new CyDataAccessor(`cui-toolbar-item-${key}`)
  }

  /** tree */
  cuiTreeItem() {
    return new CyDataAccessor('cui-tree-item')
  }

  cuiTreeItemPrimaryTitle(primaryTitle: string) {
    return new CyDataAccessor(`cui-tree-item-primary-title-${primaryTitle}`)
  }

  cuiTreeItemSecondaryTitle(secondaryTitle: string) {
    return new CyDataAccessor(`cui-tree-item-secondary-title-${secondaryTitle}`)
  }

  cuiTreeItemToolbar() {
    return new CyDataAccessor('cui-tree-item-toolbar')
  }
}

export const CY_DATA = new CyDataBuilder()
