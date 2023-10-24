import {
  type IAppDomainService,
  type IAtomDomainService,
  type IComponentDomainService,
  type IElementDomainService,
  type IFieldDomainService,
  type IPageDomainService,
  type IRendererDomainService,
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
      componentDomainService: prop<IComponentDomainService | undefined>(
        undefined,
      ),
      elementDomainService: prop<IElementDomainService | undefined>(undefined),
      fieldDomainService: prop<IFieldDomainService | undefined>(undefined),
      pageDomainService: prop<IPageDomainService | undefined>(undefined),
      rendererDomainService: prop<IRendererDomainService | undefined>(
        undefined,
      ),
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
      this.rendererDomainService &&
        context.rendererDomainServiceContext?.set(
          this,
          this.rendererDomainService,
        )

      registerRootStore(this)
    }
  }

  return new RootDomainStore(store) as IRootDomainStore
}
