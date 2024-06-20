'use client'

import type {
  IActionService,
  IAdminService,
  IApplicationStore,
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
import { TracerService } from '@codelab/frontend/infra/otel'
import { AdminService } from '@codelab/frontend-application-admin/services'
import { AppService } from '@codelab/frontend-application-app/services'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend-application-atom/services'
import { AuthGuardService } from '@codelab/frontend-application-auth-guard/services'
import { BuilderService } from '@codelab/frontend-application-builder/services'
import { ComponentApplicationService } from '@codelab/frontend-application-component/services'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend-application-domain/services'
import { ElementService } from '@codelab/frontend-application-element/services'
import {
  PageApplicationService,
  pageServiceContext,
} from '@codelab/frontend-application-page/services'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend-application-prop/services'
import { RedirectService } from '@codelab/frontend-application-redirect/services'
import {
  RendererApplicationService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend-application-renderer/services'
import { ResourceService } from '@codelab/frontend-application-resource/services'
import { RouterService } from '@codelab/frontend-application-shared-store/router'
import {
  ActionService,
  actionServiceContext,
  StoreService,
  storeServiceContext,
} from '@codelab/frontend-application-store/services'
import {
  TagService,
  tagServiceContext,
} from '@codelab/frontend-application-tag/services'
import {
  FieldService,
  fieldServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend-application-type/services'
import { UserService } from '@codelab/frontend-application-user/services'
import { TagDomainService } from '@codelab/frontend-domain-tag/services'
import { typeDomainServiceContext } from '@codelab/frontend-domain-type/services'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'

export const createApplicationStore = () => {
  @model('@codelab/ApplicationStore')
  class ApplicationStore
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
      userService: prop<IUserService>(() => new UserService({})),
    })
    implements IApplicationStore
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

  return new ApplicationStore({}) as IApplicationStore
}

export let applicationStore: IApplicationStore | undefined

applicationStore ??= createApplicationStore()
