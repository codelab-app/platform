import type {
  IAtomDomainService,
  IElementDomainService,
  IPageDomainService,
} from '@codelab/frontend/abstract/domain'
import { AtomDomainService } from '@codelab/frontend/domain/atom'
import { PageDomainService } from '@codelab/frontend/domain/page'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { ElementDomainService } from '../services/element.domain.service'

export const createTestRootStore = () => {
  @model('@codelab/TestRootStore')
  class TestRootStore extends Model({
    atomDomainService: prop<IAtomDomainService>(
      () => new AtomDomainService({}),
    ),
    elementDomainService: prop<IElementDomainService>(
      () => new ElementDomainService({}),
    ),
    pageDomainService: prop<IPageDomainService>(
      () => new PageDomainService({}),
    ),
  }) {
    protected override onInit() {
      registerRootStore(this)
    }
  }

  const rootStore = new TestRootStore({})

  return rootStore
}
