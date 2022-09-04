import { IActionService } from '../domain/action'
import { IAdminService } from '../domain/admin'
import { IAppService } from '../domain/app'
import { IAtomService } from '../domain/atom'
import { IBuilderService, IRenderService } from '../domain/builder'
import { IComponentService } from '../domain/component'
import { IDomainService } from '../domain/domain'
import { IElementService } from '../domain/element'
import { IPageService } from '../domain/page'
import { IResourceService } from '../domain/resource'
import { IStoreService } from '../domain/store'
import { ITagService } from '../domain/tag'
import { ITypeService } from '../domain/type'
import { IUserDTO, IUserService } from '../domain/user'

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
  user?: IUserDTO
  servicesFromSnapshot?: any
  init?: boolean
}

export interface IRootStore {
  setUserService(userService: IUserService): void
  userService: IUserService
  appService: IAppService
  pageService: IPageService
  typeService: ITypeService
  atomService: IAtomService
  tagService: ITagService
  adminService: IAdminService
  componentService: IComponentService
  actionService: IActionService
  storeService: IStoreService
  appRenderService: IRenderService
  builderRenderService: IRenderService
  elementService: IElementService
  builderService: IBuilderService
  resourceService: IResourceService
  domainService: IDomainService
}
