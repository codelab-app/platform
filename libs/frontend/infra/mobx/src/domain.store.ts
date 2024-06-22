import type {
  IAppDomainService,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import { AppDomainService } from '@codelab/frontend-domain-app/services'
import { Model, model, prop } from 'mobx-keystone'

export const createDomainStore = () => {
  @model('@codelab/DomainStore')
  class DomainStore
    extends Model({
      appDomainService: prop<IAppDomainService>(() => new AppDomainService({})),
    })
    implements IDomainStore {}

  return new DomainStore({}) as IDomainStore
}
