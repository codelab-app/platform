import {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IElementService,
  IPageService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/shared/abstract/core'

export const APP_SERVICE = 'appService'
export const ADMIN_SERVICE = 'adminService'
export const PAGE_SERVICE = 'pageService'
export const ATOM_SERVICE = 'atomService'
export const ELEMENT_SERVICE = 'elementService'
export const USER_SERVICE = 'userService'
export const TAG_SERVICE = 'tagService'
export const COMPONENT_SERVICE = 'componentService'
export const BUILDER_SERVICE = 'builderService'
export const RENDER_SERVICE = 'renderService'
export const TYPE_SERVICE = 'typeService'
export const STORE_SERVICE = 'storeService'
export const ACTION_SERVICE = 'actionService'
export const RESOURCE_SERVICE = 'resourceService'
export const OPERATION_SERVICE = 'operationService'

export type APP_SERVICE = typeof APP_SERVICE
export type ADMIN_SERVICE = typeof ADMIN_SERVICE
export type PAGE_SERVICE = typeof PAGE_SERVICE
export type ATOM_SERVICE = typeof ATOM_SERVICE
export type ELEMENT_SERVICE = typeof ELEMENT_SERVICE
export type USER_SERVICE = typeof USER_SERVICE
export type TAG_SERVICE = typeof TAG_SERVICE
export type COMPONENT_SERVICE = typeof COMPONENT_SERVICE
export type BUILDER_SERVICE = typeof BUILDER_SERVICE
export type RENDER_SERVICE = typeof RENDER_SERVICE
export type TYPE_SERVICE = typeof TYPE_SERVICE
export type STORE_SERVICE = typeof STORE_SERVICE
export type ACTION_SERVICE = typeof ACTION_SERVICE
export type RESOURCE_SERVICE = typeof RESOURCE_SERVICE
export type OPERATION_SERVICE = typeof OPERATION_SERVICE

export type DomainServices = {
  [APP_SERVICE]: IAppService
  [ADMIN_SERVICE]: IAdminService
  [PAGE_SERVICE]: IPageService
  [USER_SERVICE]: IUserService
  [ATOM_SERVICE]: IAtomService
  [TAG_SERVICE]: ITagService
  [COMPONENT_SERVICE]: IComponentService
  [ELEMENT_SERVICE]: IElementService
  [BUILDER_SERVICE]: IBuilderService
  [RENDER_SERVICE]: IRenderService
  [TYPE_SERVICE]: ITypeService
  [STORE_SERVICE]: IStoreService
  [ACTION_SERVICE]: IActionService
  [RESOURCE_SERVICE]: IResourceService
}

export type WithServices<T extends keyof DomainServices> = {
  [K in T]: DomainServices[K]
}
