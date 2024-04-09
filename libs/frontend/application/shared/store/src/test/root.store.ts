import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IAuthGuardService,
  IBuilderService,
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
  IRootStoreDtoTest,
  IRouterService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IStoreService,
  ITagService,
  ITracerService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export const createTestRootStore = ({ context, store }: IRootStoreDtoTest) => {
  @model('@codelab/TestRootStore')
  class TestRootStore
    extends Model({
      actionService: prop<Maybe<IActionService>>(undefined),
      adminService: prop<Maybe<IAdminService>>(undefined),
      appService: prop<Maybe<IAppService>>(undefined),
      atomService: prop<Maybe<IAtomService>>(undefined),
      authGuardService: prop<Maybe<IAuthGuardService>>(() => undefined),
      builderService: prop<Maybe<IBuilderService>>(undefined),
      componentService: prop<Maybe<IComponentApplicationService>>(undefined),
      domainService: prop<Maybe<IDomainService>>(undefined),
      elementApplicationService: prop<Maybe<IElementService>>(undefined),
      elementService: prop<Maybe<IElementService>>(undefined),
      fieldService: prop<Maybe<IFieldService>>(undefined),
      pageService: prop<Maybe<IPageApplicationService>>(undefined),
      propService: prop<Maybe<IPropService>>(undefined),
      redirectService: prop<Maybe<IRedirectService>>(() => undefined),
      rendererService: prop<Maybe<IRendererService>>(undefined),
      resourceService: prop<Maybe<IResourceService>>(undefined),
      routerService: prop<Maybe<IRouterService>>(undefined),
      runtimeComponentService: prop<Maybe<IRuntimeComponentService>>(undefined),
      runtimeElementService: prop<Maybe<IRuntimeElementService>>(undefined),
      storeService: prop<Maybe<IStoreService>>(undefined),
      tagService: prop<Maybe<ITagService>>(() => undefined),
      tracerService: prop<Maybe<ITracerService>>(() => undefined),
      typeService: prop<Maybe<ITypeService>>(() => undefined),
      userService: prop<Maybe<IUserService>>(() => undefined),
    })
    implements Partial<IRootStore>
  {
    public clear() {
      this.typeService?.typeDomainService.types.clear()
      this.authGuardService?.authGuardDomainService.authGuards.clear()
      this.redirectService?.redirectDomainService.redirects.clear()
      this.actionService?.actionDomainService.actions.clear()
      this.appService?.appDomainService.apps.clear()
      this.resourceService?.resourceDomainService.resources.clear()
      this.pageService?.pageDomainService.pages.clear()
      this.atomService?.atomDomainService.atoms.clear()
      this.componentService?.componentDomainService.components.clear()
      this.elementService?.elementDomainService.elements.clear()
      this.fieldService?.fieldDomainService.fields.clear()
      this.actionService?.actionDomainService.actions.clear()
      this.storeService?.storeDomainService.stores.clear()
      this.tagService?.tagDomainService.tags.clear()
      this.userService?.userDomainService.users.clear()
      this.rendererService?.renderers.clear()
      this.runtimeComponentService?.components.clear()
      this.runtimeElementService?.elements.clear()
    }

    protected onInit() {
      const {
        actionDomainServiceContext,
        actionServiceContext,
        appDomainServiceContext,
        appServiceContext,
        atomDomainServiceContext,
        atomServiceContext,
        builderServiceContext,
        componentDomainServiceContext,
        componentServiceContext,
        domainServiceContext,
        elementDomainServiceContext,
        elementServiceContext,
        fieldDomainServiceContext,
        fieldServiceContext,
        pageDomainServiceContext,
        pageServiceContext,
        propServiceContext,
        rendererServiceContext,
        resourceDomainServiceContext,
        resourceServiceContext,
        routerServiceContext,
        runtimeComponentServiceContext,
        runtimeElementServiceContext,
        storeDomainServiceContext,
        storeServiceContext,
        tagServiceContext,
        typeDomainServiceContext,
        typeServiceContext,
        userDomainServiceContext,
        userServiceContext,
      } = context

      actionServiceContext?.set(this, this.actionService)
      actionDomainServiceContext?.set(
        this,
        this.actionService?.actionDomainService,
      )
      appServiceContext?.set(this, this.appService)
      appDomainServiceContext?.set(this, this.appService?.appDomainService)
      domainServiceContext?.set(this, this.domainService)
      pageServiceContext?.set(this, this.pageService)
      pageDomainServiceContext?.set(this, this.pageService?.pageDomainService)
      typeServiceContext?.set(this, this.typeService)
      typeDomainServiceContext?.set(this, this.typeService?.typeDomainService)
      atomServiceContext?.set(this, this.atomService)
      fieldDomainServiceContext?.set(
        this,
        this.fieldService?.fieldDomainService,
      )
      atomDomainServiceContext?.set(this, this.atomService?.atomDomainService)
      componentServiceContext?.set(this, this.componentService)
      storeDomainServiceContext?.set(
        this,
        this.storeService?.storeDomainService,
      )
      actionServiceContext?.set(this, this.actionService)
      storeServiceContext?.set(this, this.storeService)
      runtimeElementServiceContext?.set(this, this.runtimeElementService)
      runtimeComponentServiceContext?.set(this, this.runtimeComponentService)
      storeDomainServiceContext?.set(
        this,
        this.storeService?.storeDomainService,
      )
      resourceServiceContext?.set(this, this.resourceService)
      resourceDomainServiceContext?.set(
        this,
        this.resourceService?.resourceDomainService,
      )
      routerServiceContext?.set(this, this.routerService)
      propServiceContext?.set(this, this.propService)
      elementServiceContext?.set(this, this.elementService)
      elementDomainServiceContext?.set(
        this,
        this.elementService?.elementDomainService,
      )
      builderServiceContext?.set(this, this.builderService)
      userServiceContext?.set(this, this.userService)
      userDomainServiceContext?.set(this, this.userService?.userDomainService)
      tagServiceContext?.set(this, this.tagService)
      fieldServiceContext?.set(this, this.fieldService)
      componentDomainServiceContext?.set(
        this,
        this.componentService?.componentDomainService,
      )
      rendererServiceContext?.set(this, this.rendererService)

      registerRootStore(this)
    }
  }

  return new TestRootStore(store) as IRootStore
}
