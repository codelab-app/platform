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
import type {
  IAppDomainService,
  IAtomDomainService,
  IComponentDomainService,
  IElementDomainService,
  IFieldDomainService,
  IPageDomainService,
  IRootDomainStore,
  IRootDomainStoreDto,
  IStoreDomainService,
  ITypeDomainService,
  IUserDomainService,
} from '@codelab/frontend/abstract/domain'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export const createRootDomainStore = ({
  context,
  store,
}: IRootDomainStoreDto) => {
  @model('@codelab/TestRootStore')
  class RootDomainStore
    extends Model({
      appDomainService: prop<IAppDomainService | undefined>(undefined),
      atomDomainService: prop<IAtomDomainService | undefined>(undefined),
      componentDomainService: prop<IComponentDomainService | undefined>(
        undefined,
      ),
      elementDomainService: prop<IElementDomainService | undefined>(undefined),
      fieldDomainService: prop<IFieldDomainService | undefined>(undefined),
      pageDomainService: prop<IPageDomainService | undefined>(undefined),
      storeDomainService: prop<IStoreDomainService | undefined>(undefined),
      typeDomainService: prop<ITypeDomainService | undefined>(undefined),
      userDomainService: prop<IUserDomainService | undefined>(undefined),
    })
    implements Partial<IRootDomainStore>
  {
    clear() {
      //
    }

    protected override onInit() {
      this.appDomainService &&
        context.appDomainServiceContext?.set(this, this.appDomainService)
      this.atomDomainService &&
        context.atomDomainServiceContext?.set(this, this.atomDomainService)
      this.userDomainService &&
        context.userDomainServiceContext?.set(this, this.userDomainService)
      this.typeDomainService &&
        context.typeDomainServiceContext?.set(this, this.typeDomainService)
      this.storeDomainService &&
        context.storeDomainServiceContext?.set(this, this.storeDomainService)
      this.pageDomainService &&
        context.pageDomainServiceContext?.set(this, this.pageDomainService)
      this.elementDomainService &&
        context.elementDomainServiceContext?.set(
          this,
          this.elementDomainService,
        )
      this.componentDomainService &&
        context.componentDomainServiceContext?.set(
          this,
          this.componentDomainService,
        )

      registerRootStore(this)
    }
  }

  return new RootDomainStore(store) as IRootDomainStore
}
