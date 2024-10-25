// eslint-disable-next-line no-restricted-imports
import _slugify from 'slugify'

import { type UiData, UiKey } from './ui-key'

/**
 * @deprecated Don't export this, force access via the `get` functions below
 *
 * Not all labels are used
 */
const UiDataRecord = {
  /**
   * Action
   */
  [UiKey.ActionFormCreate]: {
    label: 'Create Action Form',
  },
  [UiKey.ActionFormUpdate]: {
    label: 'Update Action Form',
  },
  [UiKey.ActionModalCreate]: {
    label: 'Create Action Modal',
  },
  [UiKey.ActionModalDelete]: {
    label: 'Delete Action Modal',
  },
  [UiKey.ActionModalUpdate]: {
    label: 'Update Action Modal',
  },
  [UiKey.ActionPopoverCreate]: {
    label: 'Create Action Popover',
  },
  [UiKey.ActionPopoverUpdate]: {
    label: 'Update Action Popover',
  },
  [UiKey.ActionToolbarItemCreate]: {
    label: 'Create Action Toolbar Item',
  },
  [UiKey.ActionToolbarItemCreateCancel]: {
    label: 'Cancel Create Action Toolbar Item',
  },
  [UiKey.ActionToolbarItemDelete]: {
    label: 'Delete Action Toolbar Item',
  },
  [UiKey.ActionToolbarItemUpdate]: {
    label: 'Update Action Toolbar Item',
  },
  [UiKey.ActionToolbarItemUpdateCancel]: {
    label: 'Cancel Update Action Toolbar Item',
  },
  /**
   * Admin
   */
  [UiKey.AdminDataModalExport]: {
    label: 'Export Admin Data Modal',
  },
  [UiKey.AdminDataModalImport]: {
    label: 'Import Admin Data Modal',
  },
  /**
   * App
   */
  [UiKey.AppButtonOpenCreateForm]: {
    label: 'Open Create App Form Button',
  },
  [UiKey.AppFormCreate]: {
    label: 'Create App Form',
  },
  [UiKey.AppModalBuild]: {
    label: 'Build App Modal',
  },
  [UiKey.AppModalCreate]: {
    label: 'Create App',
  },
  [UiKey.AppModalDelete]: {
    label: 'Delete App Modal',
  },
  [UiKey.AppModalUpdate]: {
    label: 'Update App Modal',
  },
  [UiKey.AppToolbarItemBuild]: {
    label: 'Build App Toolbar Item',
  },
  [UiKey.AppToolbarItemCreate]: {
    label: 'Create App Toolbar Item',
  },
  [UiKey.AppToolbarItemImport]: {
    label: 'Import App Toolbar Item',
  },
  /**
   * Atom
   */
  [UiKey.AtomFormCreate]: {
    label: 'Create Atom Form',
  },
  [UiKey.AtomFormUpdate]: {
    label: 'Update Atom Form',
  },
  [UiKey.AtomModalCreate]: {
    label: 'Create Atom Modal',
  },
  [UiKey.AtomModalDelete]: {
    label: 'Delete Atom Modal',
  },
  [UiKey.AtomModalUpdate]: {
    label: 'Update Atom Modal',
  },
  // Atom
  [UiKey.AtomPopoverCreate]: {
    label: 'New Atom',
  },
  [UiKey.AtomPopoverUpdate]: {
    label: 'Update',
  },
  [UiKey.AtomSidebar]: {
    label: 'Atom Sidebar',
  },
  [UiKey.AtomsModalDelete]: {
    label: 'Delete Atoms Modal',
  },
  [UiKey.AtomsToolbarItemDelete]: {
    label: 'Delete Atoms Toolbar Item',
  },
  [UiKey.AtomToolbarItemCreate]: {
    label: 'Create Atom Toolbar Item',
  },
  [UiKey.AtomToolbarItemCreateCancel]: {
    label: 'Cancel Create Atom Toolbar Item',
  },
  [UiKey.AtomToolbarItemUpdate]: {
    label: 'Update Atom Toolbar Item',
  },
  [UiKey.AtomToolbarItemUpdateCancel]: {
    label: 'Cancel',
  },
  /**
   * AuthGuard
   */
  [UiKey.AuthGuardFormCreate]: {
    label: 'Create Auth Guard Form',
  },
  [UiKey.AuthGuardFormUpdate]: {
    label: 'Update Auth Guard Form',
  },
  [UiKey.AuthGuardModalCreate]: {
    label: 'Create Auth Guard Modal',
  },
  [UiKey.AuthGuardModalDelete]: {
    label: 'Delete Auth Guard Modal',
  },
  [UiKey.AuthGuardModalUpdate]: {
    label: 'Update Auth Guard Modal',
  },
  [UiKey.AuthGuardPopoverCreate]: {
    label: 'Create Auth Guard Popover',
  },
  [UiKey.AuthGuardSidebar]: {
    label: 'Auth Guard Sidebar',
  },
  [UiKey.AuthGuardToolbarItemCreate]: {
    label: 'Create Auth Guard Toolbar Item',
  },
  [UiKey.AuthGuardToolbarItemCreateCancel]: {
    label: 'Cancel Create Auth Guard Toolbar Item',
  },
  [UiKey.AuthGuardToolbarItemDelete]: {
    label: 'Delete Auth Guard Toolbar Item',
  },
  /**
   * Builder
   */
  [UiKey.BuilderSidebar]: {
    label: 'Builder Sidebar',
  },
  [UiKey.BuilderToolbarItemOpenBuilder]: {
    label: 'Open Builder Builder Toolbar Item',
  },
  [UiKey.BuilderToolbarItemOpenPreview]: {
    label: 'Open Preview Builder Toolbar Item',
  },
  /**
   * Button
   */
  [UiKey.ButtonConfirmation]: {
    label: 'Confirmation Button',
  },
  /**
   * Component
   */
  [UiKey.ComponentFormCreate]: {
    label: 'Create Component Form',
  },
  [UiKey.ComponentFormUpdate]: {
    label: 'Update Component Form',
  },
  [UiKey.ComponentModalDelete]: {
    label: 'Delete Component Modal',
  },
  [UiKey.ComponentModalUpdate]: {
    label: 'Update Component Modal',
  },
  [UiKey.ComponentPopoverCreate]: {
    label: 'Create Component Popover',
  },
  [UiKey.ComponentSidebar]: {
    label: 'Component Sidebar',
  },
  [UiKey.ComponentToolbarItemCreate]: {
    label: 'Create Component Toolbar Item',
  },
  [UiKey.ComponentToolbarItemCreateCancel]: {
    label: 'Cancel Create Component Toolbar Item',
  },
  [UiKey.ComponentToolbarItemImport]: {
    label: 'Import Component Toolbar Item',
  },
  /**
   * Domain
   */
  [UiKey.DomainModalCreate]: {
    label: 'Create Domain Modal',
  },
  [UiKey.DomainModalDelete]: {
    label: 'Delete Domain Modal',
  },
  [UiKey.DomainModalUpdate]: {
    label: 'Update Domain Modal',
  },
  [UiKey.DomainToolbarItemCreate]: {
    label: 'Create Domain Toolbar Item',
  },
  /**
   * Element
   */
  [UiKey.ElementFormCreate]: {
    label: 'Create Element Form',
  },
  [UiKey.ElementFormMove]: {
    label: 'Move Element Form',
  },
  [UiKey.ElementFormUpdate]: {
    label: 'Update Element Form',
  },
  [UiKey.ElementModalDelete]: {
    label: 'Delete Element Modal',
  },
  [UiKey.ElementPopoverCreate]: {
    label: 'Create Element Popover',
  },
  [UiKey.ElementToolbarItemCreate]: {
    label: 'Create Element Toolbar Item',
  },
  [UiKey.ElementToolbarItemCreateCancel]: {
    label: 'Cancel Create Element Toolbar Item',
  },
  /**
   * Field
   */
  [UiKey.FieldFormCreate]: {
    label: 'Create Field Form',
  },
  [UiKey.FieldFormSelectDefaultValue]: {
    label: 'Select Default Value Field Form',
  },
  [UiKey.FieldFormSelectUnionTypeValue]: {
    label: 'Select Union Type Value Field Form',
  },
  [UiKey.FieldFormUpdate]: {
    label: 'Update Field Form',
  },
  [UiKey.FieldModalCreate]: {
    label: 'Create Field Modal',
  },
  [UiKey.FieldModalDelete]: {
    label: 'Delete Field Modal',
  },
  [UiKey.FieldModalUpdate]: {
    label: 'Update Field Modal',
  },
  [UiKey.FieldPopoverCreate]: {
    label: 'Create Field Popover',
  },
  [UiKey.FieldPopoverUpdate]: {
    label: 'Update Field Popover',
  },
  [UiKey.FieldToolbarItemCreate]: {
    label: 'Create Field Toolbar Item',
  },
  [UiKey.FieldToolbarItemCreateCancel]: {
    label: 'Cancel Create Field Toolbar Item',
  },
  [UiKey.FieldToolbarItemDelete]: {
    label: 'Delete Field Toolbar Item',
  },
  [UiKey.FieldToolbarItemUpdate]: {
    label: 'Update Field Toolbar Item',
  },
  [UiKey.FieldToolbarItemUpdateCancel]: {
    label: 'Cancel Update Field Toolbar Item',
  },
  [UiKey.FormInterface]: {
    label: 'Interface Form',
  },
  /**
   * Lambda
   */
  [UiKey.LambdaToolbarItemCreate]: {
    label: 'Create Lambda Toolbar Item',
  },
  /**
   * Page
   */
  [UiKey.PageFormCreate]: {
    label: 'Create Page Form',
  },
  [UiKey.PageFormUpdate]: {
    label: 'Update Page Form',
  },
  [UiKey.PageModalDelete]: {
    label: 'Delete Page Modal',
  },
  [UiKey.PagePopoverCreate]: {
    label: 'Create Page Popover',
  },
  [UiKey.PagePopoverUpdate]: {
    label: 'Update Page Popover',
  },
  [UiKey.PageSidebar]: {
    label: 'Page Sidebar',
  },
  [UiKey.PageToolbarItemCreate]: {
    label: 'Create Page Toolbar Item',
  },
  [UiKey.PageToolbarItemCreateCancel]: {
    label: 'Cancel Create Page Toolbar Item',
  },
  [UiKey.PageToolbarItemDelete]: {
    label: 'Delete Page Toolbar Item',
  },
  [UiKey.PageToolbarItemUpdate]: {
    label: 'Update Page Toolbar Item',
  },
  [UiKey.PageToolbarItemUpdateCancel]: {
    label: 'Cancel Update Page Toolbar Item',
  },
  /**
   * Pagination
   */
  [UiKey.PaginationToobarItemSearch]: {
    label: 'Search Pagination Toolbar Item',
  },
  [UiKey.PaginationToolbarItemCurrentPage]: {
    label: 'Current Page Pagination Toolbar Item',
  },
  [UiKey.PaginationToolbarItemNextPage]: {
    label: 'Next Page Pagination Toolbar Item',
  },
  [UiKey.PaginationToolbarItemPageSize]: {
    label: 'Page Size Pagination Toolbar Item',
  },
  [UiKey.PaginationToolbarItemPreviousPage]: {
    label: 'Previous Page Pagination Toolbar Item',
  },
  [UiKey.PaginationToolbarItemSearch]: {
    label: 'Search Pagination Toolbar Item',
  },
  /**
   * ProgressBar
   */
  [UiKey.ProgressBarGlobal]: {
    label: 'Global Progress Bar',
  },
  /**
   * Redirect
   */
  [UiKey.RedirectFormCreate]: {
    label: 'Create Redirect Form',
  },
  [UiKey.RedirectFormUpdate]: {
    label: 'Update Redirect Form',
  },
  [UiKey.RedirectModalDelete]: {
    label: 'Delete Redirect Modal',
  },
  [UiKey.RedirectPopoverCreate]: {
    label: 'Create Redirect Popover',
  },
  [UiKey.RedirectPopoverUpdate]: {
    label: 'Update Redirect Popover',
  },
  [UiKey.RedirectToolbarItemCreate]: {
    label: 'Create Redirect Toolbar Item',
  },
  [UiKey.RedirectToolbarItemCreateCancel]: {
    label: 'Cancel Create Redirect Toolbar Item',
  },
  [UiKey.RedirectToolbarItemUpdate]: {
    label: 'Update Redirect Toolbar Item',
  },
  [UiKey.RedirectToolbarItemUpdateCancel]: {
    label: 'Cancel Update Redirect Toolbar Item',
  },
  /**
   * Resource
   */
  [UiKey.ResourceFormCreate]: {
    label: 'Create Resource Form',
  },
  [UiKey.ResourceFormUpdate]: {
    label: 'Update Resource Form',
  },
  [UiKey.ResourceModalDelete]: {
    label: 'Delete Resource Modal',
  },
  [UiKey.ResourcePopoverCreate]: {
    label: 'Resource',
  },
  [UiKey.ResourcePopoverUpdate]: {
    label: 'Resource',
  },
  [UiKey.ResourceSidebar]: {
    label: 'Resource Sidebar',
  },
  [UiKey.ResourceToolbarItemCreate]: {
    label: 'Create Resource Toolbar Item',
  },
  [UiKey.ResourceToolbarItemCreateCancel]: {
    label: 'Cancel Create Resource Toolbar Item',
  },
  [UiKey.ResourceToolbarItemDelete]: {
    label: 'Delete Resource Toolbar Item',
  },
  [UiKey.ResourceToolbarItemUpdate]: {
    label: 'Update Resource Toolbar Item',
  },
  [UiKey.ResourceToolbarItemUpdateCancel]: {
    label: 'Cancel Update Resource Toolbar Item',
  },
  /**
   * Tag
   */
  [UiKey.TagFormCreate]: {
    label: 'Create Tag Form',
  },
  [UiKey.TagFormUpdate]: {
    label: 'Update Tag Form',
  },
  [UiKey.TagModalCreate]: {
    label: 'Create Tag Modal',
  },
  [UiKey.TagModalDelete]: {
    label: 'Delete Tag Modal',
  },
  [UiKey.TagModalUpdate]: {
    label: 'Update Tag Modal',
  },
  [UiKey.TagPopoverCreate]: {
    label: 'Create Tag Popover',
  },
  [UiKey.TagSidebar]: {
    label: 'Tag Sidebar',
  },
  [UiKey.TagToolabarItemCreateCancel]: {
    label: 'Cancel Create Tag Toolbar Item',
  },
  [UiKey.TagToolbarItemCreate]: {
    label: 'Create Tag Toolbar Item',
  },
  [UiKey.TagToolbarItemCreateCancel]: {
    label: 'Cancel Create Tag Toolbar Item',
  },
  [UiKey.TagToolbarItemDelete]: {
    label: 'Delete Tag Toolbar Item',
  },
  /**
   * Type
   */
  [UiKey.TypeFormCreate]: {
    label: 'Create Type Form',
  },
  [UiKey.TypeFormUpdate]: {
    label: 'Update Type Form',
  },
  [UiKey.TypeModalCreate]: {
    label: 'Create Type Modal',
  },
  [UiKey.TypeModalDelete]: {
    label: 'Delete Type Modal',
  },
  [UiKey.TypeModalUpdate]: {
    label: 'Update Type Modal',
  },
  [UiKey.TypePopoverCreate]: {
    label: 'Create Type Popover',
  },
  [UiKey.TypeSidebar]: {
    label: 'Type Sidebar',
  },
  [UiKey.TypeToolbarItemCreate]: {
    label: 'Create Type Toolbar Item',
  },
  [UiKey.TypeToolbarItemCreateCancel]: {
    label: 'Cancel Create Type Toolbar Item',
  },
  [UiKey.TypeToolbarItemDelete]: {
    label: 'Delete Type Toolbar Item',
  },
  /**
   * User
   */
  [UiKey.UserToolbarItemSignOut]: {
    label: 'Sign Out User Toolbar Item',
  },
} as const

// For type checking purposes, need to let UiAction to infer type so `UiActionKeys` can be a literal
const _UiDataRecord: Record<UiKey, UiData> = UiDataRecord

export const getUiDataLabel = (key: UiKey) => UiDataRecord[key].label

export const getUiDataKey = (key: UiKey) => slugify(getUiDataLabel(key))

/**
 * Copied to avoid nx dep restrictions
 */
const slugify = (value: string) => {
  return _slugify(value, {
    lower: true,
    // remove: /[*+~.()%'"!:@$^]/g,
    strict: true,
  })
}
