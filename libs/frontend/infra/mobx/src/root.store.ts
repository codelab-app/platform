import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IAuthGuardService,
  IComponentApplicationService,
  IDomainService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRedirectService,
  IRendererService,
  IResourceService,
  IRootStore,
  IRouterService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
  RootStoreData,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  authGuardServiceContext,
  componentServiceContext,
  elementServiceContext,
  redirectServiceContext,
  rendererServiceContext,
  resourceServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import type {
  IBuilderDomainService,
  ITagDomainService,
} from '@codelab/frontend/abstract/domain'
import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  authGuardDomainServiceContext,
  builderDomainServiceContext,
  componentDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  getRedirectDomainService,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  tagDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AdminService } from '@codelab/frontend/application/admin'
import { AppService } from '@codelab/frontend/application/app'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { AuthGuardService } from '@codelab/frontend/application/auth-guard'
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
import { RendererApplicationService } from '@codelab/frontend/application/renderer'
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
import { BuilderDomainService } from '@codelab/frontend/domain/builder'
import { TagDomainService } from '@codelab/frontend/domain/tag'
import { typeDomainServiceContext } from '@codelab/frontend/domain/type'
import { Model, model, prop } from 'mobx-keystone'

export const createRootStore = ({ routerQuery, user }: RootStoreData) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      actionService: prop<IActionService>(() => new ActionService({})),
      adminService: prop<IAdminService>(() => new AdminService({})),
      appService: prop<IAppService>(() => new AppService({})),
      atomService: prop<IAtomService>(() => new AtomService({})),
      authGuardService: prop<IAuthGuardService>(() => new AuthGuardService({})),
      builderService: prop<IBuilderDomainService>(
        () => new BuilderDomainService({}),
      ),
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
      routerService: prop<IRouterService>(() =>
        RouterService.init(routerQuery),
      ),
      storeService: prop<IStoreService>(() => new StoreService({})),
      tagDomainService: prop<ITagDomainService>(() => new TagDomainService({})),
      tagService: prop<ITagService>(() => new TagService({})),
      typeService: prop<ITypeService>(() => new TypeService({})),
      userService: prop<IUserService>(() => UserService.init(user)),
    })
    implements IRootStore
  {
    public clear() {
      this.typeService.typeDomainService.types.clear()
      this.appService.appDomainService.apps.clear()
      this.atomService.atomDomainService.atoms.clear()
      this.componentService.componentDomainService.components.clear()
      this.elementService.elementDomainService.elements.clear()
      this.fieldService.fieldDomainService.fields.clear()
      this.actionService.actionDomainService.actions.clear()
      this.storeService.storeDomainService.stores.clear()
      this.tagService.tagDomainService.tags.clear()
      this.userService.userDomainService.users.clear()
      this.rendererService.renderers.clear()
      this.redirectService.redirectDomainService.redirects.clear()
    }

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
      builderDomainServiceContext.set(this, this.builderService)
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
      rendererServiceContext.set(this, this.rendererService)
      actionDomainServiceContext.set(
        this,
        this.actionService.actionDomainService,
      )
      tagDomainServiceContext.set(this, this.tagDomainService)
    }
  }

  return new RootStore({}) as IRootStore
}
