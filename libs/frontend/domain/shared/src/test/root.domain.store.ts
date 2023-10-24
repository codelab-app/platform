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
import {
  type IAppDomainService,
  type IAtomDomainService,
  type IElementDomainService,
  type IRootDomainStore,
  type IRootDomainStoreDto,
  type IStoreDomainService,
  type ITypeDomainService,
  type IUserDomainService,
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
      elementDomainService: prop<IElementDomainService | undefined>(undefined),
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
      this.elementDomainService &&
        context.elementDomainServiceContext?.set(
          this,
          this.elementDomainService,
        )

      registerRootStore(this)
    }
  }

  return new RootDomainStore(store)
}
