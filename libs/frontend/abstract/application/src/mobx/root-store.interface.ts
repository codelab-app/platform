import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentApplicationService,
  IDomainService,
  IElementApplicationService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
<<<<<<<< HEAD:libs/frontend/application/shared/store/src/root-store.interface.ts
} from '@codelab/frontend/abstract/application'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AnyModel } from 'mobx-keystone'
========
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { IElementApplicationService } from '../element.application.service.interface'
>>>>>>>> 6a8128374 (wip: separate interface to application & domain layer):libs/frontend/abstract/application/src/mobx/root-store.interface.ts

/**
 * Initial data to be injected into store
 */
export interface RootStoreData {
  user: Auth0IdToken
}

export interface IRootStore {
  actionService: IActionService
  adminService: IAdminService
  appService: IAppService
  atomService: IAtomService
  builderService: IBuilderService
  componentService: IComponentApplicationService
  domainService: IDomainService
  elementApplicationService: IElementApplicationService
  elementService: IElementService
  fieldService: IFieldService
  pageService: IPageApplicationService
  propService: IPropService
  renderService: IRenderService
  resourceService: IResourceService
  storeService: IStoreService
  tagService: ITagService
  typeService: ITypeService
  userService: IUserService
}
