import {
  appDomainServiceContext,
  atomDomainServiceContext,
  type IAppDomainService,
  type IAtomDomainService,
  type IDomainStore,
  type IPageDomainService,
  pageDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AppDomainService } from '@codelab/frontend-domain-app/services'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { Model, model, prop } from 'mobx-keystone'

export const createDomainStore = () => {
  @model('@codelab/DomainStore')
  class DomainStore
    extends Model({
      appDomainService: prop<IAppDomainService>(() => new AppDomainService({})),
      atomDomainService: prop<IAtomDomainService>(
        () => new AtomDomainService({}),
      ),
      pageDomainService: prop<IPageDomainService>(
        () => new PageDomainService({}),
      ),
    })
    implements IDomainStore
  {
    protected onInit(): void {
      appDomainServiceContext.set(this, this.appDomainService)
      pageDomainServiceContext.set(this, this.pageDomainService)
      atomDomainServiceContext.set(this, this.atomDomainService)
    }
  }

  return new DomainStore({}) as IDomainStore
}
