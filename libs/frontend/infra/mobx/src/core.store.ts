import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IAuthGuardService,
  IBuilderService,
  IComponentApplicationService,
  ICoreStore,
  IDomainService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRedirectService,
  IRendererService,
  IResourceService,
  IRouterProps,
  IRouterService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
  IStoreService,
  ITagService,
  ITracerService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  authGuardServiceContext,
  builderServiceContext,
  componentServiceContext,
  elementServiceContext,
  redirectServiceContext,
  rendererServiceContext,
  resourceServiceContext,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import type { ITagDomainService } from '@codelab/frontend/abstract/domain'
import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  authGuardDomainServiceContext,
  componentDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  tagDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AdminService } from '@codelab/frontend/application/admin'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { AuthGuardService } from '@codelab/frontend/application/auth-guard'
import { BuilderService } from '@codelab/frontend/application/builder'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend/application/domain'
import { ElementService } from '@codelab/frontend/application/element'
import {
  PageApplicationService,
  pageServiceContext,
} from '@codelab/frontend/application/page'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend/application/prop'
import { RedirectService } from '@codelab/frontend/application/redirect'
import {
  RendererApplicationService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend/application/renderer'
import { ResourceService } from '@codelab/frontend/application/resource'
import { RouterService } from '@codelab/frontend/application/shared/store'
import {
  ActionService,
  actionServiceContext,
  StoreService,
  storeServiceContext,
} from '@codelab/frontend/application/store'
import {
  TagService,
  tagServiceContext,
} from '@codelab/frontend/application/tag'
import {
  FieldService,
  fieldServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend/application/type'
import { UserService } from '@codelab/frontend/application/user'
import { TagDomainService } from '@codelab/frontend/domain/tag'
import { typeDomainServiceContext } from '@codelab/frontend/domain/type'
import { TracerService } from '@codelab/frontend/infra/otel'
import { AppService } from '@codelab/frontend-application-app/services'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export const createCoreStore = (router: IRouterProps, user: Auth0IdToken) => {
  @model('@codelab/CoreStore')
  class CoreStore
    extends Model({
      actionService: prop<IActionService>(() => new ActionService({})),
      adminService: prop<IAdminService>(() => new AdminService({})),
      appService: prop<IAppService>(() => new AppService({})),
      atomService: prop<IAtomService>(() => new AtomService({})),
      authGuardService: prop<IAuthGuardService>(() => new AuthGuardService({})),
      builderService: prop<IBuilderService>(() => new BuilderService({})),
      componentService: prop<IComponentApplicationService>(
        () => new ComponentApplicationService({}),
      ),
      domainService: prop<IDomainService>(() => new DomainService({})),
      elementApplicationService: prop<IElementService>(
        () => new ElementService({}),
      ),
      elementService: prop<IElementService>(() => new ElementService({})),
      fieldService: prop<IFieldService>(() => new FieldService({})),
      pageService: prop<IPageApplicationService>(
        () => new PageApplicationService({}),
      ),
      propService: prop<IPropService>(() => new PropService({})),
      redirectService: prop<IRedirectService>(() => new RedirectService({})),
      rendererService: prop<IRendererService>(
        () => new RendererApplicationService({}),
      ),
      resourceService: prop<IResourceService>(() => new ResourceService({})),
      routerService: prop<IRouterService>(() => RouterService.init(router)),
      runtimeComponentService: prop<IRuntimeComponentService>(
        () => new RuntimeComponentService({}),
      ),
      runtimeElementService: prop<IRuntimeElementService>(
        () => new RuntimeElementService({}),
      ),
      runtimePageService: prop<IRuntimePageService>(
        () => new RuntimePageService({}),
      ),
      storeService: prop<IStoreService>(() => new StoreService({})),
      tagDomainService: prop<ITagDomainService>(() => new TagDomainService({})),
      tagService: prop<ITagService>(() => new TagService({})),
      tracerService: prop<ITracerService>(() => new TracerService({})),
      typeService: prop<ITypeService>(() => new TypeService({})),
      userService: prop<IUserService>(() => UserService.init(user)),
    })
    implements ICoreStore
  {
    protected onInit() {
      appServiceContext.set(this, this.appService)
      appDomainServiceContext.set(this, this.appService.appDomainService)
      authGuardServiceContext.set(this, this.authGuardService)
      authGuardDomainServiceContext.set(
        this,
        this.authGuardService.authGuardDomainService,
      )
      domainServiceContext.set(this, this.domainService)
      pageServiceContext.set(this, this.pageService)
      pageDomainServiceContext.set(this, this.pageService.pageDomainService)
      typeServiceContext.set(this, this.typeService)
      typeDomainServiceContext.set(this, this.typeService.typeDomainService)
      atomServiceContext.set(this, this.atomService)
      fieldDomainServiceContext.set(this, this.fieldService.fieldDomainService)
      atomDomainServiceContext.set(this, this.atomService.atomDomainService)
      componentServiceContext.set(this, this.componentService)
      storeDomainServiceContext.set(this, this.storeService.storeDomainService)
      actionServiceContext.set(this, this.actionService)
      storeServiceContext.set(this, this.storeService)
      storeDomainServiceContext.set(this, this.storeService.storeDomainService)
      resourceServiceContext.set(this, this.resourceService)
      resourceDomainServiceContext.set(
        this,
        this.resourceService.resourceDomainService,
      )
      propServiceContext.set(this, this.propService)
      elementServiceContext.set(this, this.elementService)
      elementDomainServiceContext.set(
        this,
        this.elementService.elementDomainService,
      )
      builderServiceContext.set(this, this.builderService)
      userServiceContext.set(this, this.userService)
      userDomainServiceContext.set(this, this.userService.userDomainService)
      tagServiceContext.set(this, this.tagService)
      fieldServiceContext.set(this, this.fieldService)
      componentDomainServiceContext.set(
        this,
        this.componentService.componentDomainService,
      )
      redirectServiceContext.set(this, this.redirectService)
      redirectDomainServiceContext.set(
        this,
        this.redirectService.redirectDomainService,
      )
      routerServiceContext.set(this, this.routerService)
      rendererServiceContext.set(this, this.rendererService)
      runtimeElementServiceContext.set(this, this.runtimeElementService)
      runtimeComponentServiceContext.set(this, this.runtimeComponentService)
      runtimePageServiceContext.set(this, this.runtimePageService)
      actionDomainServiceContext.set(
        this,
        this.actionService.actionDomainService,
      )
      tagDomainServiceContext.set(this, this.tagDomainService)
    }
  }

  return new CoreStore({}) as ICoreStore
}
