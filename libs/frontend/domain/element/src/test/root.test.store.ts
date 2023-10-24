import type {
  IAtomDomainService,
  IElementDomainService,
} from '@codelab/frontend/abstract/domain'
// import { AppDomainService } from '@codelab/frontend/domain/app'
import { AtomDomainService } from '@codelab/frontend/domain/atom'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { ElementDomainService } from '../services/element.domain.service'

export const createTestRootStore = () => {
  @model('@codelab/TestRootStore')
  class TestRootStore extends Model({
    // appDomainService: prop<IAppDomainService>(() => new AppDomainService({})),
    atomDomainService: prop<IAtomDomainService>(
      () => new AtomDomainService({}),
    ),
    elementDomainService: prop<IElementDomainService>(
      () => new ElementDomainService({}),
    ),
  }) {
    protected override onInit() {
      registerRootStore(this)
    }
  }

  const rootStore = new TestRootStore({})

  return rootStore
}
