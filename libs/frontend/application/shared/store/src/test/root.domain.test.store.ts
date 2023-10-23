import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderDomainService,
  IComponentApplicationService,
  IDomainService,
  IElementApplicationService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRendererApplicationService,
  IResourceService,
  IRootStore,
  IRootStoreContext,
  IRootStoreDto,
  IRootStoreDtoTest,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export const createTestRootStore = ({ context, store }: IRootStoreDtoTest) => {
  @model('@codelab/TestRootStore')
  class TestRootStore
    extends Model({
      actionService: prop<IActionService | undefined>(undefined),
      adminService: prop<IAdminService | undefined>(undefined),
      appService: prop<IAppService | undefined>(undefined),
      atomService: prop<IAtomService | undefined>(undefined),
      builderService: prop<IBuilderDomainService | undefined>(undefined),
      componentService: prop<IComponentApplicationService | undefined>(
        undefined,
      ),
      domainService: prop<IDomainService | undefined>(undefined),
      elementApplicationService: prop<IElementApplicationService | undefined>(
        undefined,
      ),
      elementService: prop<IElementService | undefined>(undefined),
      fieldService: prop<IFieldService | undefined>(undefined),
      pageService: prop<IPageApplicationService | undefined>(undefined),
      propService: prop<IPropService | undefined>(undefined),
      rendererService: prop<IRendererApplicationService | undefined>(undefined),
      resourceService: prop<IResourceService | undefined>(undefined),
      storeService: prop<IStoreService | undefined>(undefined),
      tagService: prop<ITagService | undefined>(undefined),
      typeService: prop<ITypeService | undefined>(undefined),
      userService: prop<IUserService | undefined>(undefined),
    })
    implements Partial<IRootStore>
  {
    clear() {
      //
    }

    protected override onInit() {
      this.appService && context.appServiceContext?.set(this, this.appService)
      this.domainService &&
        context.domainServiceContext?.set(this, this.domainService)
      this.pageService &&
        context.pageServiceContext?.set(this, this.pageService)
      this.typeService &&
        context.typeServiceContext?.set(this, this.typeService)
      this.typeService?.typeDomainService &&
        context.typeDomainServiceContext?.set(
          this,
          this.typeService.typeDomainService,
        )
      this.atomService &&
        context.atomServiceContext?.set(this, this.atomService)
      this.atomService?.atomDomainService &&
        context.atomDomainServiceContext?.set(
          this,
          this.atomService.atomDomainService,
        )
      this.componentService &&
        context.componentServiceContext?.set(this, this.componentService)
      this.storeService?.storeDomainService &&
        context.storeDomainServiceContext?.set(
          this,
          this.storeService.storeDomainService,
        )
      this.actionService &&
        context.actionServiceContext?.set(this, this.actionService)
      this.storeService &&
        context.storeServiceContext?.set(this, this.storeService)
      this.storeService?.storeDomainService &&
        context.storeDomainServiceContext?.set(
          this,
          this.storeService.storeDomainService,
        )
      this.resourceService &&
        context.resourceServiceContext?.set(this, this.resourceService)
      this.propService &&
        context.propServiceContext?.set(this, this.propService)
      this.elementService &&
        context.elementServiceContext?.set(this, this.elementService)
      this.builderService &&
        context.builderServiceContext?.set(this, this.builderService)
      this.userService &&
        context.userServiceContext?.set(this, this.userService)
      this.tagService && context.tagServiceContext?.set(this, this.tagService)
      this.fieldService &&
        context.fieldServiceContext?.set(this, this.fieldService)
      this.rendererService &&
        context.rendererApplicationServiceContext?.set(
          this,
          this.rendererService,
        )

      registerRootStore(this)
    }
  }

  return new TestRootStore(store)
}
