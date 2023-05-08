import type { IUserDTO } from '@codelab/shared/abstract/core'
import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IDomainService,
  IElementService,
  IFieldService,
  IPageService,
  IPropService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '../domain'

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
  init?: boolean
  servicesFromSnapshot?: unknown
  user?: IUserDTO
}

export interface IRootStore {
  actionService: IActionService
  adminService: IAdminService
  appRenderService: IRenderService
  appService: IAppService
  atomService: IAtomService
  builderRenderService: IRenderService
  builderService: IBuilderService
  componentService: IComponentService
  domainService: IDomainService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageService
  propService: IPropService
  resourceService: IResourceService
  storeService: IStoreService
  tagService: ITagService
  typeService: ITypeService
  userService: IUserService
}
