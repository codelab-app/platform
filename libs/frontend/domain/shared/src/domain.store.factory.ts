import type {
  IActionDomainService,
  IAppDomainService,
  IAtomDomainService,
  IAuthGuardDomainService,
  IComponentDomainService,
  IDomainDomainService,
  IDomainStore,
  IDomainStoreDto,
  IDomainStoreFactoryDto,
  IElementDomainService,
  IFieldDomainService,
  IPageDomainService,
  IRedirectDomainService,
  IResourceDomainService,
  IStoreDomainService,
  ITagDomainService,
  ITypeDomainService,
  IUserDomainService,
} from '@codelab/frontend-abstract-domain'

import { Model, model, prop, registerRootStore } from 'mobx-keystone'

/**
 * Create a factory for the structure, but only pass in interface for the props.
 * This way we don't get circular dependencies.
 */
export const domainStoreFactory = ({
  context,
  store,
}: IDomainStoreFactoryDto) => {
  @model('@codelab/DomainStore')
  class DomainStore
    extends Model({
      actionDomainService: prop<IActionDomainService | undefined>(undefined),
      appDomainService: prop<IAppDomainService | undefined>(undefined),
      atomDomainService: prop<IAtomDomainService | undefined>(undefined),
      authGuardDomainService: prop<IAuthGuardDomainService | undefined>(
        undefined,
      ),
      componentDomainService: prop<IComponentDomainService | undefined>(
        undefined,
      ),
      domainDomainService: prop<IDomainDomainService | undefined>(undefined),
      elementDomainService: prop<IElementDomainService | undefined>(undefined),
      fieldDomainService: prop<IFieldDomainService | undefined>(undefined),
      pageDomainService: prop<IPageDomainService | undefined>(undefined),
      redirectDomainService: prop<IRedirectDomainService | undefined>(
        undefined,
      ),
      resourceDomainService: prop<IResourceDomainService | undefined>(
        undefined,
      ),
      storeDomainService: prop<IStoreDomainService | undefined>(undefined),
      tagDomainService: prop<ITagDomainService | undefined>(undefined),
      typeDomainService: prop<ITypeDomainService | undefined>(undefined),
      userDomainService: prop<IUserDomainService | undefined>(undefined),
    })
    implements Partial<IDomainStore>
  {
    clear() {
      //
    }

    protected override onInit() {
      this.actionDomainService &&
        context.actionDomainServiceContext?.set(this, this.actionDomainService)
      this.appDomainService &&
        context.appDomainServiceContext?.set(this, this.appDomainService)
      this.atomDomainService &&
        context.atomDomainServiceContext?.set(this, this.atomDomainService)
      this.authGuardDomainService &&
        context.authGuardDomainServiceContext?.set(
          this,
          this.authGuardDomainService,
        )
      this.componentDomainService &&
        context.componentDomainServiceContext?.set(
          this,
          this.componentDomainService,
        )
      this.domainDomainService &&
        context.domainDomainServiceContext?.set(this, this.domainDomainService)
      this.elementDomainService &&
        context.elementDomainServiceContext?.set(
          this,
          this.elementDomainService,
        )
      this.fieldDomainService &&
        context.fieldDomainServiceContext?.set(this, this.fieldDomainService)
      this.pageDomainService &&
        context.pageDomainServiceContext?.set(this, this.pageDomainService)
      this.redirectDomainService &&
        context.redirectDomainServiceContext?.set(
          this,
          this.redirectDomainService,
        )
      this.resourceDomainService &&
        context.resourceDomainServiceContext?.set(
          this,
          this.resourceDomainService,
        )
      this.storeDomainService &&
        context.storeDomainServiceContext?.set(this, this.storeDomainService)
      this.tagDomainService &&
        context.tagDomainServiceContext?.set(this, this.tagDomainService)
      this.typeDomainService &&
        context.typeDomainServiceContext?.set(this, this.typeDomainService)
      this.userDomainService &&
        context.userDomainServiceContext?.set(this, this.userDomainService)
    }
  }

  return new DomainStore(store)
}
