import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IComponentApplicationService,
  IDomainService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRendererService,
  IResourceService,
  IRootStore,
  IRootStoreDtoTest,
  IRouterService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import type { IBuilderDomainService } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export const createRootApplicationStore = ({
  context,
  store,
}: IRootStoreDtoTest) => {
  @model('@codelab/TestRootStore')
  class TestRootStore
    extends Model({
      actionService: prop<Maybe<IActionService>>(undefined),
      adminService: prop<Maybe<IAdminService>>(undefined),
      appService: prop<Maybe<IAppService>>(undefined),
      atomService: prop<Maybe<IAtomService>>(undefined),
      builderService: prop<Maybe<IBuilderDomainService>>(undefined),
      componentService: prop<Maybe<IComponentApplicationService>>(undefined),
      domainService: prop<Maybe<IDomainService>>(undefined),
      elementApplicationService: prop<Maybe<IElementService>>(undefined),
      elementService: prop<Maybe<IElementService>>(undefined),
      fieldService: prop<Maybe<IFieldService>>(undefined),
      pageService: prop<Maybe<IPageApplicationService>>(undefined),
      propService: prop<Maybe<IPropService>>(undefined),
      rendererService: prop<Maybe<IRendererService>>(undefined),
      resourceService: prop<Maybe<IResourceService>>(undefined),
      routerService: prop<Maybe<IRouterService>>(undefined),
      storeService: prop<Maybe<IStoreService>>(undefined),
      tagService: prop<Maybe<ITagService>>(() => undefined),
      typeService: prop<Maybe<ITypeService>>(() => undefined),
      userService: prop<Maybe<IUserService>>(() => undefined),
    })
    implements Partial<IRootStore>
  {
    public clear() {
      this.typeService?.typeDomainService.types.clear()
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
    }

    protected onInit() {
      const {
        actionDomainServiceContext,
        actionServiceContext,
        appDomainServiceContext,
        appServiceContext,
        atomDomainServiceContext,
        atomServiceContext,
        builderDomainServiceContext,
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
      storeDomainServiceContext?.set(
        this,
        this.storeService?.storeDomainService,
      )
      resourceServiceContext?.set(this, this.resourceService)
      resourceDomainServiceContext?.set(
        this,
        this.resourceService?.resourceDomainService,
      )
      propServiceContext?.set(this, this.propService)
      elementServiceContext?.set(this, this.elementService)
      elementDomainServiceContext?.set(
        this,
        this.elementService?.elementDomainService,
      )
      builderDomainServiceContext?.set(this, this.builderService)
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
