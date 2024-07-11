import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  type IAppDomainService,
  type IAtomDomainService,
  IComponentDomainService,
  type IDomainStore,
  IElementDomainService,
  type IPageDomainService,
  IStoreDomainService,
  ITypeDomainService,
  IUserDomainService,
  pageDomainServiceContext,
  storeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AppDomainService } from '@codelab/frontend-domain-app/services'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { ComponentDomainService } from '@codelab/frontend-domain-component/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { StoreDomainService } from '@codelab/frontend-domain-store/services'
import {
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend-domain-type/services'
import { UserDomainService } from '@codelab/frontend-domain-user/services'
import { IUserDto } from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'

export const createDomainStore = (user: IUserDto) => {
  @model('@codelab/DomainStore')
  class DomainStore
    extends Model({
      appDomainService: prop<IAppDomainService>(() => new AppDomainService({})),
      atomDomainService: prop<IAtomDomainService>(
        () => new AtomDomainService({}),
      ),
      componentDomainService: prop<IComponentDomainService>(
        () => new ComponentDomainService({}),
      ),
      elementDomainService: prop<IElementDomainService>(
        () => new ElementDomainService({}),
      ),
      pageDomainService: prop<IPageDomainService>(
        () => new PageDomainService({}),
      ),
      storeDomainService: prop<IStoreDomainService>(
        () => new StoreDomainService({}),
      ),
      typeDomainService: prop<ITypeDomainService>(
        () => new TypeDomainService({}),
      ),
      userDomainService: prop<IUserDomainService>(() =>
        UserDomainService.fromDto(user),
      ),
    })
    implements IDomainStore
  {
    protected onInit(): void {
      appDomainServiceContext.set(this, this.appDomainService)
      pageDomainServiceContext.set(this, this.pageDomainService)
      atomDomainServiceContext.set(this, this.atomDomainService)
      userDomainServiceContext.set(this, this.userDomainService)
      typeDomainServiceContext.set(this, this.typeDomainService)
      storeDomainServiceContext.set(this, this.storeDomainService)
      elementDomainServiceContext.set(this, this.elementDomainService)
    }
  }

  return new DomainStore({}) as IDomainStore
}
