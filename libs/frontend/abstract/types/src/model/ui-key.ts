export interface UiData {
  label: string
}

/**
 * Use BEM style naming so we can sort it properly
 */
export enum UiKey {
  /**
   * Action
   */
  ActionFormCreate = 'ActionFormCreate',
  ActionFormUpdate = 'ActionFormUpdate',
  ActionModalCreate = 'ActionModalCreate',
  ActionModalDelete = 'ActionModalDelete',
  ActionModalUpdate = 'ActionModalUpdate',
  ActionPopoverCreate = 'ActionPopoverCreate',
  ActionPopoverUpdate = 'ActionPopoverUpdate',
  ActionToolbarItemCreate = 'ActionToolbarItemCreate',
  ActionToolbarItemCreateCancel = 'ActionToolbarItemCreateCancel',
  ActionToolbarItemDelete = 'ActionToolbarItemDelete',
  ActionToolbarItemUpdate = 'ActionToolbarItemUpdate',
  ActionToolbarItemUpdateCancel = 'ActionToolbarItemUpdateCancel',
  /**
   * Admin
   */
  AdminDataModalExport = 'AdminDataModalExport',
  AdminDataModalImport = 'AdminDataModalImport',
  /**
   * App
   */
  AppButtonOpenCreateForm = 'AppButtonOpenCreateForm',
  AppFormCreate = 'AppFormCreate',
  AppModalBuild = 'AppModalBuild',
  AppModalCreate = 'AppModalCreate',
  AppModalDelete = 'AppModalDelete',
  AppModalUpdate = 'AppModalUpdate',
  AppToolbarItemBuild = 'AppToolbarItemBuild',
  AppToolbarItemCreate = 'AppToolbarItemCreate',
  AppToolbarItemImport = 'AppToolbarItemImport',
  /**
   * Atom
   */
  AtomFormCreate = 'AtomFormCreate',
  AtomFormUpdate = 'AtomFormUpdate',
  AtomModalCreate = 'AtomModalCreate',
  AtomModalDelete = 'AtomModalDelete',
  AtomModalUpdate = 'AtomModalUpdate',
  AtomPopoverCreate = 'AtomPopoverCreate',
  AtomPopoverUpdate = 'AtomPopoverUpdate',
  AtomSidebar = 'AtomSidebar',
  AtomsModalDelete = 'AtomsModalDelete',
  AtomsToolbarItemDelete = 'AtomsToolbarItemDelete',
  AtomToolbarItemCreate = 'AtomToolbarItemCreate',
  AtomToolbarItemCreateCancel = 'AtomToolbarItemCreateCancel',
  AtomToolbarItemUpdate = 'AtomToolbarItemUpdate',
  AtomToolbarItemUpdateCancel = 'AtomToolbarItemUpdateCancel',
  /**
   * Auth Guard
   */
  AuthGuardFormCreate = 'AuthGuardFormCreate',
  AuthGuardFormUpdate = 'AuthGuardFormUpdate',
  AuthGuardModalCreate = 'AuthGuardModalCreate',
  AuthGuardModalDelete = 'AuthGuardModalDelete',
  AuthGuardModalUpdate = 'AuthGuardModalUpdate',
  AuthGuardPopoverCreate = 'AuthGuardPopoverCreate',
  AuthGuardSidebar = 'AuthGuardSidebar',
  AuthGuardToolbarItemCreate = 'AuthGuardToolbarItemCreate',
  AuthGuardToolbarItemCreateCancel = 'AuthGuardToolbarItemCreateCancel',
  AuthGuardToolbarItemDelete = 'AuthGuardToolbarItemDelete',
  /**
   * Builder
   */
  BuilderSidebar = 'BuilderSidebar',
  BuilderToolbarItemOpenBuilder = 'BuilderToolbarItemOpenBuilder',
  BuilderToolbarItemOpenPreview = 'BuilderToolbarItemOpenPreview',
  /**
   * Button
   */
  ButtonConfirmation = 'ButtonConfirmation',
  /**
   * Component
   */
  ComponentFormCreate = 'ComponentFormCreate',
  ComponentFormUpdate = 'ComponentFormUpdate',
  ComponentModalDelete = 'ComponentModalDelete',
  ComponentModalUpdate = 'ComponentModalUpdate',
  ComponentPopoverCreate = 'ComponentPopoverCreate',
  ComponentSidebar = 'ComponentSidebar',
  ComponentToolbarItemCreate = 'ComponentToolbarItemCreate',
  ComponentToolbarItemCreateCancel = 'ComponentToolbarItemCreateCancel',
  ComponentToolbarItemImport = 'ComponentToolbarItemImport',
  /**
   * Domain
   */
  DomainModalCreate = 'DomainModalCreate',
  DomainModalDelete = 'DomainModalDelete',
  DomainModalUpdate = 'DomainModalUpdate',
  DomainToolbarItemCreate = 'DomainToolbarItemCreate',
  /**
   * Element
   */
  ElementFormCreate = 'ElementFormCreate',
  ElementFormMove = 'ElementFormMove',
  ElementFormUpdate = 'ElementFormUpdate',
  ElementModalDelete = 'ElementModalDelete',
  ElementPopoverCreate = 'ElementPopoverCreate',
  ElementToolbarItemCreate = 'ElementToolbarItemCreate',
  ElementToolbarItemCreateCancel = 'ElementToolbarItemCreateCancel',
  /**
   * Field
   */
  FieldFormCreate = 'FieldFormCreate',
  FieldFormSelectDefaultValue = 'FieldFormSelectDefaultValue',
  FieldFormSelectUnionTypeValue = 'FieldFormSelectUnionTypeValue',
  FieldFormUpdate = 'FieldFormUpdate',
  FieldModalCreate = 'FieldModalCreate',
  FieldModalDelete = 'FieldModalDelete',
  FieldModalUpdate = 'FieldModalUpdate',
  FieldPopoverCreate = 'FieldPopoverCreate',
  FieldPopoverUpdate = 'FieldPopoverUpdate',
  FieldToolbarItemCreate = 'FieldToolbarItemCreate',
  FieldToolbarItemCreateCancel = 'FieldToolbarItemCreateCancel',
  FieldToolbarItemDelete = 'FieldToolbarItemDelete',
  FieldToolbarItemUpdate = 'FieldToolbarItemUpdate',
  FieldToolbarItemUpdateCancel = 'FieldToolbarItemUpdateCancel',

  /**
   * Form
   */
  FormInterface = 'FormInterface',
  /**
   * Lambda
   */
  LambdaToolbarItemCreate = 'LambdaToolbarItemCreate',
  /**
   * Page
   */
  PageFormCreate = 'PageFormCreate',
  PageFormUpdate = 'PageFormUpdate',
  PageModalDelete = 'PageModalDelete',
  PagePopoverCreate = 'PagePopoverCreate',
  PagePopoverUpdate = 'PagePopoverUpdate',
  PageSidebar = 'PageSidebar',
  PageToolbarItemCreate = 'PageToolbarItemCreate',
  PageToolbarItemCreateCancel = 'PageToolbarItemCreateCancel',
  PageToolbarItemDelete = 'PageToolbarItemDelete',
  PageToolbarItemUpdate = 'PageToolbarItemUpdate',
  PageToolbarItemUpdateCancel = 'PageToolbarItemUpdateCancel',
  /**
   * Pagination
   */
  PaginationToobarItemSearch = 'PaginationToobarItemSearch',
  PaginationToolbarItemCurrentPage = 'PaginationToolbarItemCurrentPage',
  PaginationToolbarItemNextPage = 'PaginationToolbarItemNextPage',
  PaginationToolbarItemPageSize = 'PaginationToolbarItemPageSize',
  PaginationToolbarItemPreviousPage = 'PaginationToolbarItemPreviousPage',
  PaginationToolbarItemSearch = 'PaginationToolbarItemSearch',
  /**
   * Progress Bar
   */
  ProgressBarGlobal = 'ProgressBarGlobal',
  /**
   * Redirect
   */
  RedirectFormCreate = 'RedirectFormCreate',
  RedirectFormUpdate = 'RedirectFormUpdate',
  RedirectModalDelete = 'RedirectModalDelete',
  RedirectPopoverCreate = 'RedirectPopoverCreate',
  RedirectPopoverUpdate = 'RedirectPopoverUpdate',
  RedirectToolbarItemCreate = 'RedirectToolbarItemCreate',
  RedirectToolbarItemCreateCancel = 'RedirectToolbarItemCreateCancel',
  RedirectToolbarItemUpdate = 'RedirectToolbarItemUpdate',
  RedirectToolbarItemUpdateCancel = 'RedirectToolbarItemUpdateCancel',
  /**
   * Resource
   */
  ResourceFormCreate = 'ResourceFormCreate',
  ResourceFormUpdate = 'ResourceFormUpdate',
  ResourceModalDelete = 'ResourceModalDelete',
  ResourcePopoverCreate = 'ResourcePopoverCreate',
  ResourcePopoverUpdate = 'ResourcePopoverUpdate',
  ResourceSidebar = 'ResourceSidebar',
  ResourceToolbarItemCreate = 'ResourceToolbarItemCreate',
  ResourceToolbarItemCreateCancel = 'ResourceToolbarItemCreateCancel',
  ResourceToolbarItemDelete = 'ResourceToolbarItemDelete',
  ResourceToolbarItemUpdate = 'ResourceToolbarItemUpdate',
  ResourceToolbarItemUpdateCancel = 'ResourceToolbarItemUpdateCancel',
  /**
   * Tag
   */
  TagFormCreate = 'TagFormCreate',
  TagFormUpdate = 'TagFormUpdate',
  TagModalCreate = 'TagModalCreate',
  TagModalDelete = 'TagModalDelete',
  TagModalUpdate = 'TagModalUpdate',
  TagPopoverCreate = 'TagPopoverCreate',
  TagSidebar = 'TagSidebar',
  TagToolabarItemCreateCancel = 'TagToolabarItemCreateCancel',
  TagToolbarItemCreate = 'TagToolbarItemCreate',
  TagToolbarItemCreateCancel = 'TagToolbarItemCreateCancel',
  TagToolbarItemDelete = 'TagToolbarItemDelete',
  /**
   * Type
   */
  TypeFormCreate = 'TypeFormCreate',
  TypeFormUpdate = 'TypeFormUpdate',
  TypeModalCreate = 'TypeModalCreate',
  TypeModalDelete = 'TypeModalDelete',
  TypeModalUpdate = 'TypeModalUpdate',
  TypePopoverCreate = 'TypePopoverCreate',
  TypeSidebar = 'TypeSidebar',
  TypeToolbarItemCreate = 'TypeToolbarItemCreate',
  TypeToolbarItemCreateCancel = 'TypeToolbarItemCreateCancel',
  TypeToolbarItemDelete = 'TypeToolbarItemDelete',
  /**
   * User
   */
  UserToolbarItemSignOut = 'UserToolbarItemSignOut',
}
